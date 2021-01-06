const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE station(idStation int AUTO_INCREMENT, country varchar(255),city varchar(255), street varchar(255), number varchar(255), name varchar(255), telephone varchar(255), email varchar(255), website varchar(255), PRIMARY KEY (idStation))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table station created...');
    });

});
//this is to send the router to the app
module.exports = router;