const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE userHasCar(idUserHasCar int AUTO_INCREMENT,idUser int , idCar int , PRIMARY KEY (idUserHasCar), FOREIGN KEY (idUser) REFERENCES user(idUser), FOREIGN KEY (idCar) REFERENCES car(idCar))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table userHasCar created...');
    });

});
//this is to send the router to the app
module.exports = router;