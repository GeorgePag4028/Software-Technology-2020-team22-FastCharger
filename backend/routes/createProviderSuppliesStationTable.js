const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE carChargedTransaction(idProviderSuppliesStation int AUTO_INCREMENT, idStation int, idProvider int , PRIMARY KEY (idProviderSuppliesStation),FOREIGN KEY (ididStationCar) REFERENCE station(idStation),FOREIGN KEY (idProvider) REFERENCE provider(idProvider))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table carChargedTransaction created...');
    });

});
//this is to send the router to the app
module.exports = router;