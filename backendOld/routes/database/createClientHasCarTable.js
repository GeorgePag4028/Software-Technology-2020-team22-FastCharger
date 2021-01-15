const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE clientHasCar(idClientHasCar int AUTO_INCREMENT,idClient int , idCar int , PRIMARY KEY (idClientHasCar), FOREIGN KEY (idClient) REFERENCES client(idClient) ON DELETE CASCADE, FOREIGN KEY (idCar) REFERENCES car(idCar) ON DELETE CASCADE)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table userHasCar created...');
    });

});
//this is to send the router to the app
module.exports = router;