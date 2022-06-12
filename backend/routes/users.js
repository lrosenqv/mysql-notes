const express = require('express');
const router = express.Router();
const pool = require('../connection').pool
const cryptoJS = require('crypto-js');
const AES = require('crypto-js/aes');
const mysql = require('mysql2');

//GET one user by id
router.get('/:id', (req, res) => {
  let sql = `SELECT id, email FROM users WHERE id=?`;

  pool.execute(sql, [req.params.id], (err, result) => {
    if(err) console.error(err);

    res.json(result)
  })
})

//Add new user
router.post('/', (req, res) => {
  let encryptedPass = AES.encrypt(req.body.password, process.env.SALT).toString()
  let sql = `INSERT INTO users (email, password) VALUES (?, ?)`

  pool.execute(sql, [req.body.email, encryptedPass], (err, result) => {
    if(err) console.error(err);

    res.status(201).send("New user added!")
  })
})

//Login
router.post('/login', (req, res) => {
  let sql = `SELECT * FROM users WHERE email=?`;

  pool.execute(sql, [req.body.email], (error, result) => {
    if(result.length > 0) {
      let decryptedPass = AES.decrypt(result[0].password, process.env.SALT).toString(cryptoJS.enc.Utf8);

      if(req.body.password === decryptedPass){
        res.status(200).json(result[0].id)
      } 
    } else {
      res.status(404).send('Please sign in with valid credentials');
      pool.destroy()
    }
    if(error) {
      console.error(error);
    }
  })
})

module.exports = router;
