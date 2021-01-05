const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all carChargedTransactions
router.get('/getAllCarChargedTransactions', (req, res) => {
    let sql = 'SELECT * FROM carChargedTransaction';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one carChargedTransaction
router.get('/getCarChargedTransaction/:id', (req, res) => {
    let sql = `SELECT * FROM carChargedTransaction WHERE idCarChargedTransaction =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    });

});
//Create a carChargedTransaction
router.get('/postNewCarChargedTransaction', (req, res) => {
    const newCarChargedTransaction = {
        idTransaction: '1',
        idCar: '1',
        presentageBatteryStart : '45.1',
        presentageBatteryFinish : '95.1',
        durationInMin : '60.1'
    };
    if (!newCarChargedTransaction.idTransaction || !newCarChargedTransaction.idCar || !newCarChargedTransaction.presentageBatteryStart || !newCarChargedTransaction.presentageBatteryFinish || !newCarChargedTransaction.durationInMin) {
        return res.status(400).json({
            msg: 'Please include a idTransaction, idCar, presentageBatteryStart, presentageBatteryFinish, durationInMin'
        });
    }
    let sql = 'INSERT INTO carChargedTransaction SET ?';
    let query = db.query(sql, newCarChargedTransaction, (err, result) => {
        if (err) throw err;
        res.send('CarChargedTransaction added ...');
    });
});
//updateCarChargedTransaction
router.get('/updateCarChargedTransaction/:id', (req, res) => {
    let newDurationInMin = '120.1';
    let sql = `UPDATE carChargedTransaction SET durationInMin='${newDurationInMin}' WHERE idCarChargedTransaction = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('CarChargedTransaction updated...');
    });
});
//deleteCarChargedTransaction
router.get('/deleteCarChargedTransaction/:id',(req,res)=>{
    let sql = `DELETE FROM carChargedTransaction WHERE idCarChargedTransaction = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('CarChargedTransaction deleted...');
    });
} );


module.exports = router;