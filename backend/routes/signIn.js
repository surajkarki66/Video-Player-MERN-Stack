const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const key = require('../configs/default').secret_key;

router.post('/', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        // 401 means unauthorized
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign({
            userId: user[0]._id,
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
          }, 
          key,
          {
            expiresIn: "1h"
          });
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        res.status(401).json({
          message: 'Auth failed'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;