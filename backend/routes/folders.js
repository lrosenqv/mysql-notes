const express = require('express');
const router = express.Router();
const pool = require('../connection').pool

//GET one folder by id
router.get('/:id', (req, res) => {
  let sql = `SELECT * FROM folders WHERE id=?`

  pool.execute(sql, [req.params.id], (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//CHANGE folder title
router.put('/change/:id', (req, res) => {
  let sql = `UPDATE folders SET title=? WHERE id=?`

  pool.execute(sql, [req.body.title, req.params.id], (err, result) => {
    if(err){
      console.error(err)
    };

    res.status(200).send("Folder title is updated!")
  })
})

//DELETE folder
router.delete('/delete/:id', (req, res) => {
  let sql = `DELETE FROM folders WHERE id=?`
  
  pool.execute(sql, [req.params.id], (err, result) => {
    if(err) console.error(err);

    res.send(result)
  })
})

//CREATE new folder
router.post('/u/:userId', (req, res) => {
  let sql = `INSERT INTO folders (userId, title) VALUES (?, ?)`

  pool.execute(sql, [req.params.userId, req.body.title], (err, result) => {
    if(err){
      console.error(err);
    }
    console.log(result);
    res.status(200).json(result.insertId)
  })
});

//GET folders by user
router.get('/u/:userId', (req, res) => {
  let sql = `SELECT * FROM folders WHERE userId=?`

  pool.execute(sql, [req.params.userId], (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//GET all folders of user by folderId of one folder
router.get('/all/:id', (req, res) => {
  let sql = `SELECT * FROM folders WHERE userId IN(SELECT userId FROM folders WHERE id=?)`

  pool.execute(sql, [req.params.id], (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

module.exports = router;
