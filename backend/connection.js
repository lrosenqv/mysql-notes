const express = require('express');
const mysql = require('mysql2')

const pool = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
})

pool.getConnection(function(err){
  if(err){
    console.error(err);
  }
  console.log("Connected");
})

exports.connection = pool;