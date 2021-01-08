const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all carChargedTransactions
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM carChargedTransaction';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//Get one carChargedTransaction
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM carChargedTransaction WHERE idCarChargedTransaction =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    });

});

//Create a carChargedTransaction
router.post('/', (req, res) => {
    const newCarChargedTransaction = {
        ...req.body
    };
    if (!newCarChargedTransaction.idTransaction || !newCarChargedTransaction.idCar || !newCarChargedTransaction.percentageBatteryStart || !newCarChargedTransaction.percentageBatteryFinish || !newCarChargedTransaction.durationInMin) {
        return res.status(400).json({
            msg: 'Please include a idTransaction, idCar, percentageBatteryStart, percentageBatteryFinish, durationInMin'
        });
    }
    let sql = 'INSERT INTO carChargedTransaction SET ?';
    let query = db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.send('CarChargedTransaction added ...');
    });
});

//updateCarChargedTransaction
router.put('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM carChargedTransaction WHERE idCarChargedTransaction =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `CarChargedTransaction with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateCarChargedTransaction = {
                ...req.body
            };

            let sql = `UPDATE carChargedTransaction SET ? WHERE idCarChargedTransaction = ${req.params.id}`;
            let query = db.query(sql, updateCarChargedTransaction, (err, result) => {
                if (err) throw err;
                res.send('CarChargedTransaction updated...');
            });
        }
    });
});

//deleteCarChargedTransaction
router.delete('/:id',(req,res)=>{
    let sqlTest = `SELECT * FROM carChargedTransaction WHERE idCarChargedTransaction =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `CarChargedTransaction with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM carChargedTransaction WHERE idCarChargedTransaction = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('CarChargedTransaction deleted...');
            });
        }
    });
});


module.exports = router;