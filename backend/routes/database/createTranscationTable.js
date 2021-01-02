const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE transaction(idTransaction int AUTO_INCREMENT, idUser int, idCharger int ,idStation int,paymentMethod varchar(255),amount float,isInOffers bool,time datetime, PRIMARY KEY (idTransaction),FOREIGN KEY (idStation) REFERENCES station(idStation),FOREIGN KEY (idCharger) REFERENCES charger(idCharger),FOREIGN KEY (idUser) REFERENCES user(idUser))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table transaction created...');
    });

});
//this is to send the router to the app
module.exports = router;