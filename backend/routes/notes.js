const express = require('express');
const router = express.Router();
const pool = require('../connection').pool

//GET one note by id
router.get('/:id', (req, res) => {
  let sql = `SELECT * FROM notes WHERE id=?`;

  pool.execute(sql, [req.params.id], (err, result) => {
    if(err) console.error(err);

    res.status(200).json(result)
  })
})

//CHANGE note
router.put('/change/:id', (req, res) => {
  let sql = `UPDATE notes SET folderId=? , title=? , text=? WHERE id=?`;

  pool.execute(sql, [req.body.folderId, req.body.title, req.body.text, req.params.id], (err, result) => {
    if(err){
      console.error(err)
    };

    res.status(200).send("Your note is updated!")
  })
})

//CHANGE folder
router.put('/switchFolder/:id', (req, res) => {
  let sql = `UPDATE notes SET folderId=? WHERE id=?`

  pool.execute(sql, [req.body.folderId, req.params.id], (err, result) => {
    if(err){
      console.error(err)
    };
    res.status(200).send("Your note is updated!" + result)
  })
})

//DELETE note
router.delete('/delete/:id', (req, res) => {
  let sql = `DELETE FROM notes WHERE id=?`
  pool.execute(sql, [req.params.id], (err, result) => {
    if(err) console.error(err);

    res.send(result)
  })
})

//GET notes by user
router.get('/u/:userId', (req, res) => {
  let sql = `SELECT * FROM notes WHERE folderId IN(SELECT id FROM folders WHERE userId=?)`;
  pool.execute(sql, [req.params.userId], (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).json(result)
  })
})

//GET notes by folder
router.get('/f/:folderId', (req, res) => {
  let sql = `SELECT * FROM notes WHERE folderId=?`;
  pool.execute(sql, [req.params.folderId], (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//CREATE new note
router.post('/f/:folderId', (req, res) => {
  let sql = `INSERT INTO notes (folderId, title, text) VALUES (?, ?, ?)`
  pool.execute(sql, [req.params.folderId, req.body.title, req.body.text], (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(201).send(result)
  })
});

module.exports = router;
