const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE user(idCAR int AUTO_INCREMENT, type varchar(255), brand varchar(255), kilometres float, model varchar(255), releaseYear datetime, usableBatterySize varchar(255), PRIMARY KEY (idCar))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table car created...');
    });

});
//this is to send the router to the app
module.exports = router;