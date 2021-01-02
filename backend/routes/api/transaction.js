const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all transactions
router.get('/getAllTransactions', (req, res) => {
    let sql = 'SELECT * FROM transaction';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one transaction
router.get('/getTransaction/:id', (req, res) => {
    let sql = `SELECT * FROM transaction WHERE idTransaction =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    });

});
//Create a transaction
router.get('/postNewTransaction', (req, res) => {
    const newTransaction = {
        idUser: '1',
        idCharger: '1',
        paymentMethod: 'cash',
        amount: '50.01',
        isInOffers : '0',
        time : '2021-01-01 15:00:00'
    };
    if (!newTransaction.idUser || !newTransaction.idCharger || !newTransaction.paymentMethod || !newTransaction.amount || !newTransaction.isInOffers || !newTransaction.time) {
        return res.status(400).json({
            msg: 'Please include a idUser, idCharger, paymentMethod, isInOffers, time'
        });
    }
    let sql = 'INSERT INTO transaction SET ?';
    let query = db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        res.send('Transaction added ...');
    });
});
//updateTransaction
router.get('/updateTransaction/:id', (req, res) => {
    let newPaymentMethod = 'debtCard';
    let sql = `UPDATE transaction SET paymentMethod='${newPaymentMethod}' WHERE idTransaction = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Transaction updated...');
    });
});
//deleteTransaction
router.get('/deleteTransaction/:id',(req,res)=>{
    let sql = `DELETE FROM transaction WHERE idTransaction = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Transaction deleted...');
    });
} );


module.exports = router;