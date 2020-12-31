const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE transcation(idTranscation int AUTO_INCREMENT, idUser int, idCharger int ,idStation int,paymentMethod varchar(255),amount float,isInOffers bool,time datetime, PRIMARY KEY (idTranscation),FOREIGN KEY (idStation) REFERENCE station(idStation),FOREIGN KEY (idCharger) REFERENCE charger(idCharger),FOREIGN KEY (idUser) REFERENCE user(idUser))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table transcation created...');
    });

});
//this is to send the router to the app
module.exports = router;