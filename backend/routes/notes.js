const express = require('express');
const router = express.Router();
const connection = require('../connection').connection

//GET notes
router.get('/', function(req, res) {
  connection.query('SELECT * FROM notes', (err, result) => {
    if(err){
      console.error(err);
    }
    res.json(result)
  })
});

module.exports = router;
