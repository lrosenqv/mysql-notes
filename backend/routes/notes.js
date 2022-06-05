const express = require('express');
const router = express.Router();
const pool = require('../connection').connection

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

    res.status(200).send(result)
  })
})

//CHANGE note
router.put('/change/:id', (req, res) => {
  let sql = `UPDATE notes SET title="${req.body.title}", text="${req.body.text}" WHERE id="${req.params.id}"`

  pool.query(sql, (err, result) => {
    if(err){
      console.error(err)
    };

    res.status(200).send("Your note is updated!" +
     result)
  })
})

//CHANGE map
router.put('/switchMap/:id', (req, res) => {
  let sql = `UPDATE notes SET mapId="${req.body.mapId}" WHERE id="${req.params.id}"`

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

//GET notes by map
router.get('/map=:mapId', (req, res) => {
  pool.query(`SELECT * FROM notes WHERE mapId="${req.params.mapId}"`, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//CREATE new note
router.post('/map=:mapId', (req, res) => {
  let sql = `INSERT INTO notes (mapId, title, text) VALUES ("${req.params.mapId}", "${req.body.title}", "${req.body.text}")`
  pool.query(sql, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

module.exports = router;
