const express = require('express');
const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  connectionLimit: 10,
  multipleStatements: true
})

pool.getConnection(function(err, connection){
  if(err){
    console.error(err);
  }
  connection.release()
})

pool.on('release', (connection) => {
  console.log('Connection %d released', connection.threadId);
})

pool.on('connection', (stream) => { 
  console.log('Someone connected!', stream);
})


exports.connection = pool;