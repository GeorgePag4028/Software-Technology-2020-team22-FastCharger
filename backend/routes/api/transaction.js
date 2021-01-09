const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all transactions
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM transaction';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one transaction
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM transaction WHERE idTransaction =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Transaction with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});
//Create a transaction
router.post('/', (req, res) => {
    const newTransaction = {
        ...req.body
    };
    if (!newTransaction.idClient || !newTransaction.idCharger || !newTransaction.paymentMethod || !newTransaction.amount || !newTransaction.isInOffers || !newTransaction.time||!newTransaction.idStation) {
        return res.status(400).json({
            msg: 'Please include a idClient, idCharger, idStation, paymentMethod, isInOffers, and time'
        });
    }
    let sql = 'INSERT INTO transaction SET ?';
    let query = db.query(sql, newTransaction, (err, result) => {
        if (err) throw err;
        res.send('Transaction added ...');
    });
});
//updateTransaction
router.update('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM transaction WHERE idTransaction =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Transaction with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateCar = {
                ...req.body
            };
            let sql = `UPDATE trasnaction SET ? WHERE idTransaction = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('Transaction updated...');
            });

        }


    });
});
//deleteTransaction
router.delete('/:id',(req,res)=>{
    let sqlTest = `SELECT * FROM transaction WHERE idTransaction =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Transaction with this id ${req.params.id} doesn't exits.`
        });
        else {
            let sql = `DELETE FROM transaction WHERE idTransaction = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('Transaction deleted...');
            });
        }
    });
} );


module.exports = router;