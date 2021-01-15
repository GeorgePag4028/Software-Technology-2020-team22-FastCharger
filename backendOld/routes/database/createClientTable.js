const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE client(idClient int AUTO_INCREMENT, rankClient varchar(255),username varchar(255), passwordClient varchar(255), email varchar(255), PRIMARY KEY (idClient))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table Client created...');
    });

});
//this is to send the router to the app
module.exports = router;