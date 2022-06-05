const express = require('express');
const router = express.Router();
const pool = require('../connection').pool

//GET maps by id
router.get('/:id', (req, res) => {
  pool.query(`SELECT * FROM maps WHERE id="${req.params.id}"`, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//CHANGE map title
router.put('/change/:id', (req, res) => {
  let sql = `UPDATE maps SET title="${req.body.title}" WHERE id="${req.params.id}"`

  pool.query(sql, (err, result) => {
    if(err){
      console.error(err)
    };

    res.status(200).send("Map title is updated!")
  })
})

//DELETE map
router.delete('/delete/:id', (req, res) => {
  let sql = `DELETE FROM maps WHERE id=${req.params.id}`
  
  pool.query(sql, (err, result) => {
    if(err) console.error(err);

    res.send(result)
  })
})

//GET maps by user
router.get('/user=:userId', (req, res) => {
  pool.query(`SELECT * FROM maps WHERE userId="${req.params.userId}"`, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});

//CREATE new map
router.post('/user=:userId', (req, res) => {
  let sql = `INSERT INTO maps (userId, title) VALUES ("${req.params.userId}", "${req.body.title}")`
  pool.query(sql, (err, result) => {
    if(err){
      console.error(err);
    }
    res.status(200).send(result)
  })
});


module.exports = router;
