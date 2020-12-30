const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db=require('../dbconnect');



router.get('/', (req, res) => {
    let sql='CREATE DATABASE carCharger';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Database created...');
    });

});
//this is to send the router to the app
module.exports = router;