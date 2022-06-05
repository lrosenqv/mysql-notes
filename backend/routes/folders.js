const express = require('express');
const router = express.Router();
const pool = require('../connection').pool

//GET folder by id
router.get('/:id', (req, res) => {
  pool.query(`SELECT * FROM folders WHERE id="${req.params.id}"`, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//CHANGE folder title
router.put('/change/:id', (req, res) => {
  let sql = `UPDATE folders SET title="${req.body.title}" WHERE id="${req.params.id}"`

  pool.query(sql, (err, result) => {
    if(err){
      console.error(err)
    };

    res.status(200).send("Folder title is updated!")
  })
})

//DELETE folder
router.delete('/delete/:id', (req, res) => {
  let sql = `DELETE FROM folders WHERE id=${req.params.id}`
  
  pool.query(sql, (err, result) => {
    if(err) console.error(err);

    res.send(result)
  })
})

//GET folders by user
router.get('/user=:userId', (req, res) => {
  pool.query(`SELECT * FROM folders WHERE userId="${req.params.userId}"`, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//CREATE new folder
router.post('/user=:userId', (req, res) => {
  let sql = `INSERT INTO folders (userId, title) VALUES ("${req.params.userId}", "${req.body.title}")`
  pool.query(sql, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

module.exports = router;
