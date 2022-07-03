export {}

const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')
// Firestore
const serviceAccount = require('../config/firestore-playground-664ac-firebase-adminsdk-k7n4y-6190d44f73.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://firestore-playground-664ac.firebaseio.com',
})
const db = admin.firestore()

router.get('/add', function(req, res) {
  db.collection('users')
    .doc(req.query.username)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(200).send(false)
      }
      db.collection('users')
        .doc(req.query.username)
        .set({
          username: req.query.username,
        })
        .then(user => {
          res.status(200).json({
            success: 'new user created',
            user,
          })
        })
        .catch(err => console.log(err))
    })
    .catch(error => console.log(error))
})

module.exports = router
