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
router.post('/postNewCarChargedTransaction', (req, res) => {
    const newCarChargedTransaction = {
        ...req.body
    };
    /*if (!newCarChargedTransaction.idTransaction || !newCarChargedTransaction.idCar || !newCarChargedTransaction.presentageBatteryStart || !newCarChargedTransaction.presentageBatteryFinish || !newCarChargedTransaction.durationInMin) {
        return res.status(400).json({
            msg: 'Please include a idTransaction, idCar, presentageBatteryStart, presentageBatteryFinish, durationInMin'
        });
    }*/
    let sql = 'INSERT INTO carChargedTransaction SET ?';
    let query = db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.send('CarChargedTransaction added ...');
    });
});
//updateCarChargedTransaction
router.put('/updateCarChargedTransaction/:id', (req, res) => {

    const newCarChargedTransaction = {
        ...req.body
    }; 
    let sql = `UPDATE carChargedTransaction SET idTransaction =?, idCar =? ,presentageBatteryStart=?,presentageBatteryFinish=?,durationInMin=? WHERE idCarChargedTransaction =${req.params.id} `;
    

   
    let query = db.query(sql,newcarChargedTransaction, (err, result) => {
        if (err) throw err;
        res.send('CarChargedTransaction updated...');
    });
});
//deleteCarChargedTransaction
router.delete('/deleteCarChargedTransaction/:id',(req,res)=>{
    let sql = `DELETE FROM carChargedTransaction WHERE idCarChargedTransaction = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('CarChargedTransaction deleted...');
    });
} );


module.exports = router;