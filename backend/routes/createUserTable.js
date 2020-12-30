const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE user(id int AUTO_INCREMENT, rank varchar(255),username varchar(255), password int, PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table user created...');
    });

});
//this is to send the router to the app
module.exports = router;