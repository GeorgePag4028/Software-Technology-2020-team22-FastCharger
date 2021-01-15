const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE charger(idCharger int AUTO_INCREMENT, brand varchar(255),type varchar(255), isBusy bool, isFunctioning bool,idChargerOperator int , PRIMARY KEY (idCharger),FOREIGN KEY (idChargerOperator) REFERENCES client(idClient) ON DELETE CASCADE)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table charger created...');
    });

});
//this is to send the router to the app
module.exports = router;
