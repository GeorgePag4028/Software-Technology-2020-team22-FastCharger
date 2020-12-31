const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE stationOffersDiscountCharger(idStationOffersDiscountCharger int AUTO_INCREMENT, idStation int, idCharger int ,discount float, PRIMARY KEY (idStationOffersDiscountCharger),FOREIGN KEY (idStation) REFERENCES station(idStation),FOREIGN KEY (idCharger) REFERENCES charger(idCharger))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table stationOffersDiscountCharger created...');
    });

});
//this is to send the router to the app
module.exports = router;