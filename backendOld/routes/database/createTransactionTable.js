const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE transaction(idTransaction int AUTO_INCREMENT, idClient int, idCharger int ,idStation int,paymentMethod varchar(255),amount float,isInOffers bool,time datetime,idProvider int, PRIMARY KEY (idTransaction),FOREIGN KEY (idStation) REFERENCES station(idStation) ON DELETE CASCADE,FOREIGN KEY (idCharger) REFERENCES charger(idCharger) ON DELETE CASCADE,FOREIGN KEY (idClient) REFERENCES client(idClient) ON DELETE CASCADE,FOREIGN KEY (idProvider) REFERENCES provider(idProvider) ON DELETE CASCADE)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table transaction created...');
    });

});
//this is to send the router to the app
module.exports = router;
