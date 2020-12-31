const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE carChargedTransaction(idCarChargedTransaction int AUTO_INCREMENT,idTransaction int , idCar int ,presentageBatteryStart float,presentageBatteryFinish float,durationInMin float, PRIMARY KEY (idCarChargedTransaction), FOREIGN KEY (idTransaction) REFERENCES transaction(idTransaction), FOREIGN KEY (idCar) REFERENCES car(idCar))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table carChargedTransaction created...');
    });

});
//this is to send the router to the app
module.exports = router;