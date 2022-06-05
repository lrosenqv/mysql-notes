const express = require('express');
const router = express.Router();
const pool = require('../connection').connection
const cryptoJS = require('crypto-js');
const AES = require('crypto-js/aes');

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
    if(err) throw err;
    res.json(result)
  })
})

//Add new user
router.post('/', (req, res) => {
  let encryptedPass = AES.encrypt(req.body.password, process.env.SALT).toString()
  let sql = `INSERT INTO users (email, password) VALUES ("${req.body.email}", "${encryptedPass}")`
  
  pool.query(sql, (err, result) => {
    if(err) console.error(err);

    res.status(200).send("New user added!")
  })
})

//Login
router.post('/login', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) console.error(err);

    let sql = `SELECT id, email, password FROM users WHERE email="${req.body.email}"`

    connection.query(sql, (err, result) => {
      if(err){
        res.send("Wrong email or password")
      }

      let decryptedPass = AES.decrypt(result[0].password, process.env.SALT).toString(cryptoJS.enc.Utf8);

      if(req.body.password === decryptedPass){
        connection.query(`SELECT id, email, createdDate FROM users WHERE id=${result[0].id}`, (err, finalResult) => {
          res.status(200).send(finalResult[0])
        })

      } else {
        res.send("Wrong email or password")
      }
      connection.release()
    })
  })
})

module.exports = router;
