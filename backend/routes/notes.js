const express = require('express');
const router = express.Router();
const pool = require('../connection').pool

//GET all notes
router.get('/', (req, res) => {
  pool.query('SELECT * FROM notes', (err, result) => {
    if(err){
      console.error(err);
    }
    res.json(result)
  })
});

//GET one note by id
router.get('/:id', (req, res) => {
  pool.query(`SELECT * FROM notes WHERE id="${req.params.id}"`, (err, result) => {
    if(err) console.error(err);

    res.status(200).json(result)
  })
})

//CHANGE note
router.put('/change/:id', (req, res) => {
  let sql = `UPDATE notes SET title="${req.body.title}", text="${req.body.text}" WHERE id="${req.params.id}"`

  pool.query(sql, (err, result) => {
    if(err){
      console.error(err)
    };

    res.status(200).send("Your note is updated!")
  })
})

//CHANGE folder
router.put('/switchFolder/:id', (req, res) => {
  let sql = `UPDATE notes SET folderId="${req.body.folderId}" WHERE id="${req.params.id}"`

  pool.query(sql, (err, result) => {
    if(err){
      console.error(err)
    };

    res.status(200).send("Your note is updated!" + result)
  })
})

//DELETE note
router.delete('/delete/:id', (req, res) => {
  let sql = `DELETE FROM notes WHERE id=${req.params.id}`
  
  pool.query(sql, (err, result) => {
    if(err) console.error(err);

    res.send(result)
  })
})

//GET notes by folder
router.get('/folder/:folderId', (req, res) => {
  pool.query(`SELECT * FROM notes WHERE folderId="${req.params.folderId}"`, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//CREATE new note
router.post('/folder/:folderId', (req, res) => {
  let sql = `INSERT INTO notes (folderId, title, text) VALUES ("${req.params.folderId}", "${req.body.title}", "${req.body.text}")`
  pool.query(sql, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(201).send(result)
  })
});

module.exports = router;
