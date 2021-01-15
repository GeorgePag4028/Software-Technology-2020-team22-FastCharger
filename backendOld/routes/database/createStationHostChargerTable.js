const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE stationHostCharger(idStationHostCharger int AUTO_INCREMENT, idStation int, idCharger int , PRIMARY KEY (idStationHostCharger),FOREIGN KEY (idStation) REFERENCES station(idStation) ON DELETE CASCADE,FOREIGN KEY (idCharger) REFERENCES charger(idCharger) ON DELETE CASCADE)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table stationHostCharger created...');
    });

});
//this is to send the router to the app
module.exports = router;