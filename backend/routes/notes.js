const express = require('express');
const router = express.Router();
const connection = require('../connection').connection

//GET all notes
router.get('/', (req, res) => {
  connection.query('SELECT * FROM notes', (err, result) => {
    if(err){
      console.error(err);
    }
    res.json(result)
  })
});


//GET one note by id
router.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM notes WHERE id="${req.params.id}"`, (err, result) => {
    if(err) console.error(err);

    console.log(res.statusMessage);
  })
})

module.exports = router;
