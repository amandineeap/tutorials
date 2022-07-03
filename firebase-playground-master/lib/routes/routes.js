"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
// Firestore
const serviceAccount = require('../config/firestore-playground-664ac-firebase-adminsdk-k7n4y-6190d44f73.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://firestore-playground-664ac.firebaseio.com',
});
const db = admin.firestore();
// router.post('/add', function(req, res) {
//   db.collection('posts')
//     .doc()
//     .set({
//       title: req.body.data.title,
//     })
//     .then(function(post) {
//       res.status(200).json({
//         success: 'new post has been created',
//         post,
//       })
//     })
//     .catch(function(err) {
//       return res.status(500).json({
//         error: err,
//       })
//     })
// })
router.get('/add', function (req, res) {
    console.log(req.query.username);
    db.collection('users')
        .doc(req.query.username)
        .get()
        .then(doc => {
        if (doc) {
            return res.status(200).send(false);
        }
        db.collection('users')
            .doc()
            .set({
            username: req.query.username,
        })
            .then(user => {
            res.status(200).json({
                success: 'new user created',
                user,
            });
        })
            .catch(err => console.log(err));
    })
        .catch(error => console.log(error));
});
module.exports = router;
//# sourceMappingURL=routes.js.map