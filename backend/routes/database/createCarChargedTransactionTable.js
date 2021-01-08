const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../../dbconnect');

router.get('/', (req, res) => {
    let sql = 'CREATE TABLE carChargedTransaction(idCarChargedTransaction int AUTO_INCREMENT,idTransaction int , idCar int ,percentageBatteryStart float,percentageBatteryFinish float,durationInMin float, PRIMARY KEY (idCarChargedTransaction), FOREIGN KEY (idTransaction) REFERENCES transaction(idTransaction) ON DELETE CASCADE, FOREIGN KEY (idCar) REFERENCES car(idCar) ON DELETE CASCADE)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table carChargedTransaction created...');
    });

});
//this is to send the router to the app
module.exports = router;