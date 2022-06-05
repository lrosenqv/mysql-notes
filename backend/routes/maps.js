const express = require('express');
const router = express.Router();
const connection = require('../connection').connection

//GET maps
router.get('/', function(req, res) {
  connection.query('SELECT * FROM noteMap', (err, result) => {
    if(err){
      console.error(err);
    }
    res.json(result)
  })
});

module.exports = router;
