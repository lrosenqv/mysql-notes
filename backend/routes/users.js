const express = require('express');
const router = express.Router();
const pool = require('../connection').pool
const cryptoJS = require('crypto-js');
const AES = require('crypto-js/aes');
const mysql = require('mysql2')

//GET all users
router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (err, result) => {
    if(err){
      console.error(err);
    }
    res.json(result)
  })
});

//GET one user by id
router.get('/:id', (req, res) => {
  let sql = `SELECT id, email FROM users WHERE id=${req.params.id}`
  pool.query(sql, (err, result) => {
    if(err) console.error(err);

    res.json(result)
  })
})

//Add new user
router.post('/', (req, res) => {
  let encryptedPass = AES.encrypt(req.body.password, process.env.SALT).toString()
  let sql = `INSERT INTO users (email, password) VALUES ("${req.body.email}", "${encryptedPass}")`
  
  pool.query(sql, (err, result) => {
    if(err) console.error(err);

    res.status(201).send("New user added!")
  })
})

//Login
router.post('/login', (req, res) => {
  let sql = `SELECT * FROM users WHERE email="${req.body.email}"`

  pool.query(sql, (error, result) => {
    if(result.length > 0) {
      let decryptedPass = AES.decrypt(result[0].password, process.env.SALT).toString(cryptoJS.enc.Utf8);

      if(req.body.password === decryptedPass){
        console.log(res);
        res.status(200).json(result[0].id)
      } 
    } else {
      console.log(res.status());
      res.status(403).send('Please sign in with valid credentials');
    }

      /*if(result.length <= 0){
        console.log("Empty", result);
      } else {
        console.log('Not empty', result);
      }*/
      /*
      
      } */

      if(error) throw error
    })



})

module.exports = router;


  /*pool.getConnection((err, connection) => {
    if(err) throw err;

    let sql = `SELECT * FROM users WHERE email="${req.body.email}"`
    connection.query(sql, (error, result) => {
      let decryptedPass = AES.decrypt(result[0].password, process.env.SALT).toString(cryptoJS.enc.Utf8);

      if(req.body.password === decryptedPass){
        connection.query(`SELECT id, email, createdDate FROM users WHERE id=${result[0].id}`, (err, finalResult) => {
          if(err) console.error(err);

          res.status(200).send(finalResult[0])
        })
      } else {
        res.send("Wrong email or password")
      } 
      connection.destroy()

      if(error) throw error
    })
    
  })*/