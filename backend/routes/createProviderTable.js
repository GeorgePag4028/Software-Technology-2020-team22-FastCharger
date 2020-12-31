const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE provider(idProvider int AUTO_INCREMENT, pricesOnKwh float,name varchar(255), telephone varchar(255), mail varchar(255), website varchar(255), PRIMARY KEY (idProvider))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table provider created...');
    });

});
//this is to send the router to the app
module.exports = router;