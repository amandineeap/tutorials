const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),  
    me(parent, args, ctx, info){
        if(!ctx.request.userId){
            return null;
        }
        return ctx.db.query.user({
            where: {id: ctx.request.userId }
        },
        info
        );
    }, // info is query from client side
    async users(parent, args, ctx, info){
        // check if logged in
        if(!ctx.request.userId){
            throw new Error(`You must be logged in!`);
        }
        // check if user has permission to query all users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
        // query all users
        return ctx.db.query.users({}, info);
    },
    async order(parent, args, ctx, info) {
        // 1. Make sure they are logged in
        if (!ctx.request.userId) {
          throw new Error('You arent logged in!');
        }
        // 2. Query the current order
        const order = await ctx.db.query.order(
          {
            where: { id: args.id },
          },
          info
        );
        // 3. Check if the have the permissions to see this order
        const ownsOrder = order.user.id === ctx.request.userId;
        const hasPermissionToSeeOrder = ctx.request.user.permission.includes('ADMIN');
        if (!ownsOrder && !hasPermissionToSeeOrder) {
          throw new Error('You cant see this buddd');
        }
        // 4. Return the order
        return order;
      },
      async orders(parent, args, ctx, info){
        const { userId } = ctx.request;
          if(!userId){
              throw new Error('you must be logged in!')
          }
          return orders = await ctx.db.query.orders({
            where: {
                user: {id: userId}
            }
          }, info);
      }
};

module.exports = Query;