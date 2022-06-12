const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2')
const cors = require('cors')
const app = express();
const pool = require('./connection').pool

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const foldersRouter = require('./routes/folders');
const notesRouter = require('./routes/notes');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/folders', foldersRouter);
app.use('/notes', notesRouter)

pool.getConnection((err, connection) => {
  if(err){
    console.error(err);
  }
  connection.release()
})

module.exports = app;
