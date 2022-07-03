const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');
const stripe = require('../stripe');

const Mutations = {
   async createItem(parents, args, ctx, info){
       // check if logged in
    if(!ctx.request.userId){
        throw new Error('You must be logged in to do that!');
    }
    const item = await ctx.db.mutation.createItem({
        data: {
            // this creates relationship between item and user
            user: {
                connect: {
                    id: ctx.request.userId
                }
            },
            ...args
        }
    }, info);

    return item;
   },
   updateItem(parent, args, ctx, info){
       // take a copy of the updates
       const updates = {...args};
       // remove id from updates
       delete updates.id;
       // run update method
       return ctx.db.mutation.updateItem({
           data: updates,
           where: {
               id: args.id
           }
       },
       info
       );
   },
   async deleteItem(parent, args, ctx, info){
        const where = {id: args.id};
        // find item
        const item = await ctx.db.query.item({where}, `{id title user{id}}`);
        // check if permissions to delete
        const ownsItem = item.user.id = ctx.request.userId;
        const hasPermissions = ctx.request.user.permission.some(permission => ['ADMIN', 'ITEMDELETE'].includes(permission));
        if(!ownsItem && !hasPermissions){
            throw new Error('you don\'t have permissions to do that!');
        }
        // delete
        return ctx.db.mutation.deleteItem({where}, info);
   },
   async signup(parent, args, ctx, info){
        // lowercase email
        args.email = args.email.toLowerCase();
        // hash password
        const password = await bcrypt.hash(args.password, 10); //salt for unique password generation regardless of encryption
        // create user in db
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password: password,
                permission: { set: ['USER']}
                // name: args.name,
                // email: args.email,
                // password: args.password
            }
        }, info);
        // create jwt user token
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // set cooking on the response
        ctx.response.cookie('token', token, {
            httpOnly: true, // so js can't access cookie
            maxAge: 1000*60*60*24*365 // 1 year
        });        
        // return user
        return user;
   },
   async signin(parent, {email, password}, ctx, info){
    // check if user exists
    const user = await ctx.db.query.user({where: {email}});
    if(!user){
        throw new Error(`No such user found for email ${email}`);
    }
    // check if password correct
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
        throw new Error(`Invalid Password`);
    }
    // generate jwt
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    // set cookie with token
    ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000*60*60*24*365
    })
    // return user
    return user;
   },
   signout(parent,args,ctx,info){
       ctx.response.clearCookie('token');
       return {message: 'goodbye'};
   },
   async requestReset(parent, args, ctx, info){
       // check if real user
       const user = await ctx.db.query.user({where: {email: args.email}});
       if(!user){
           throw new Error(`No such user found for email ${args.email}`);
       }
       // reset token and expiry
       const randomBytesPromiseified = promisify(randomBytes);
       const resetToken = (await randomBytesPromiseified(20)).toString('hex');
       const resetTokenExpiry = Date.now() + 3600000; // 1 hour
       const res = await ctx.db.mutation.updateUser({
           where: {email: args.email},
           data: {resetToken, resetTokenExpiry}
       });
       
       // email them reset token
       const mailResponse = await transport.sendMail({
           from: 'me@me.com',
           to: user.email,
           subject: 'Password Reset Token',
           html: makeANiceEmail(`Your Password reset token is here \n\n
           <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset</a>`)
       })

       return { message: 'thanks'};

   },
   async resetPassword(parent, args, ctx, info){
       // check if password match
       if(args.password !== args.confirmPassword){
           throw new Error('yo passwords don\'t match');
       }

       // check if legic reset token
       // check if expired
       const [user] = await ctx.db.query.users({
           where: {
               resetToken: args.resetToken,
               resetTokenExpiry_gte: Date.now()- 3600000
           }
       });
       if(!user){
           throw new Error('this token is either invalid or expired');
       }
       // hash new password
       const password = await bcrypt.hash(args.password, 10);
       // save new password to user and remove old resetToken fields
       const updatedUser = await ctx.db.mutation.updateUser({
           where: {
               email: user.email
           },
           data: {
               password,
               resetToken: null,
               resetTokenExpiry: null
           }
       });
       // generate jwt
       const token = jwt.sign({userId: updatedUser.id}, process.env.APP_SECRET);
       // set jwt cookie
       ctx.response.cookie('token', token,
       {
           httpOnly: true,
           maxAge: 1000*60*60*24*365
       })
       // return the new user
       return updatedUser;
   },
    async updatePermissions(parent, args, ctx, info) {
        // 1. Check if they are logged in
        if (!ctx.request.userId) {
        throw new Error('You must be logged in!');
        }
        // 2. Query the current user
        const currentUser = await ctx.db.query.user(
        {
            where: {
            id: ctx.request.userId,
            },
        },
        info
        );
        // 3. Check if they have permissions to do this
        hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
        // 4. Update the permissions
        return ctx.db.mutation.updateUser(
        {
            data: {
            permission: {
                set: args.permission,
            },
            },
            where: {
            id: args.userId,
            },
        },
        info
        );
    },
    async addToCart(parent, args, ctx, info) {
        // 1. Make sure they are signed in
        const { userId } = ctx.request;
        if (!userId) {
          throw new Error('You must be signed in soooon');
        }
        // 2. Query the users current cart
        const [existingCartItem] = await ctx.db.query.cartItems({
          where: {
            user: { id: userId },
            item: { id: args.id },
          },
        });
        // 3. Check if that item is already in their cart and increment by 1 if it is
        if (existingCartItem) {
          console.log('This item is already in their cart');
          return ctx.db.mutation.updateCartItem(
            {
              where: { id: existingCartItem.id },
              data: { quantity: existingCartItem.quantity + 1 },
            },
            info
          );
        }
        // 4. If its not, create a fresh CartItem for that user!
        return ctx.db.mutation.createCartItem(
          {
            data: {
              user: {
                connect: { id: userId },
              },
              item: {
                connect: { id: args.id },
              },
            },
          },
          info
        );
      },
      async removeFromCart(parent, args, ctx, info){
          // find cart item
          const cartItem = await ctx.db.query.cartItem({
              where: {
                  id: args.id
              }
          },
          `{ id, user { id }}`
          )
          // make sure we find an item
          if(!cartItem){
              throw new Error(' no cart item found!')
          }
          // make sure they own cart item
          if(cartItem.user.id !== ctx.request.userId){
              throw new Error('Cheating')
          }
          // delete cart item
          return ctx.db.mutation.deleteCartItem({
              where: { id: args.id },              
          }, info); // info is query coming in from client side
      },
    async createOrder(parent, args, ctx, info) {
        // 1. Query the current user and make sure they are signed in
        const { userId } = ctx.request;
        if (!userId) throw new Error('You must be signed in to complete this order.');
        const user = await ctx.db.query.user(
          { where: { id: userId } },
          `{
          id
          name
          email
          cart {
            id
            quantity
            item { title price id description image largeImage }
          }}`
        );
        // 2. recalculate the total for the price
        const amount = user.cart.reduce(
          (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
          0
        );
        console.log(`Going to charge for a total of ${amount}`);
        // // 3. Create the stripe charge (turn token into $$$)
        const charge = await stripe.charges.create({
          amount,
          currency: 'USD',
          source: args.token,
        });
        // // 4. Convert the CartItems to OrderItems
        const orderItems = user.cart.map(cartItem => {
          const orderItem = {
            ...cartItem.item,
            quantity: cartItem.quantity,
            user: { connect: { id: userId } },
          };
          delete orderItem.id;
          return orderItem;
        });
    
        // // 5. create the Order
        const order = await ctx.db.mutation.createOrder({
          data: {
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems },
            user: { connect: { id: userId } },
          },
        });
        // // 6. Clean up - clear the users cart, delete cartItems
        const cartItemIds = user.cart.map(cartItem => cartItem.id);
        await ctx.db.mutation.deleteManyCartItems({
          where: {
            id_in: cartItemIds,
          },
        });
        // // 7. Return the Order to the client
        return order;
      },
};

module.exports = Mutations;
