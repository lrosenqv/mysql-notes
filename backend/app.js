const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2')
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express();

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

app.con = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  connectionLimit: 10,
  multipleStatements: true
})

module.exports = app;
