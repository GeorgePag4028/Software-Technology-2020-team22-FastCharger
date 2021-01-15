const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE providerSuppliesStation(idProviderSuppliesStation int AUTO_INCREMENT, idStation int, idProvider int , PRIMARY KEY (idProviderSuppliesStation),FOREIGN KEY (idStation) REFERENCES station(idStation) ON DELETE CASCADE,FOREIGN KEY (idProvider) REFERENCES provider(idProvider) ON DELETE CASCADE)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table providerSuppliesStation created...');
    });

});
//this is to send the router to the app
module.exports = router;