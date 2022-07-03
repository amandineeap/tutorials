// let's go!
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// use express to handle cookies jwt
server.express.use(cookieParser());
// use express to populate current user

// decode jwt to get user id on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if(token){
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        // put userId on the request for future request access
        req.userId = userId;
    }
    console.log(token);
    next();
});

// create middleware to populate user on each request
server.express.use(async (req, res, next) => {
    if(!req.userId) return next();

    const user = await db.query.user(
        {where: {
            id: req.userId
        }},
        '{id, permission, email, name}'
    );
    console.log(user);
    req.user = user;
    next(); 
});

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }// only our website can hit it
}, deets => {
    console.log(`Server is now running on port ${deets.port}`)
}); 