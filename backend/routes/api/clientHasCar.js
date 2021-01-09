const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all userHasCars
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM clientHasCar';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//Get one userHasCar
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM clientHasCar WHERE idClientHasCar =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `ClientHasCar with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});

//Create a userHasCar
router.post('/', (req, res) => {
    const newClientHasCar = {
        ...req.body
    };
    if (!newClientHasCar.idClient || !newClientHasCar.idCar) {
        return res.status(400).json({
            msg: 'Please include a idClient and idCar'
        });
    }
    let sql = 'INSERT INTO clientHasCar SET ?';
    let query = db.query(sql, newClientHasCar, (err, result) => {
        if (err) throw err;
        res.send('ClientHasCar added ...');
    });
});

//updateUserHasCar
router.put('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM clientHasCar WHERE idClientHasCar =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `ClientHasCar with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateUserHasCar = {
                ...req.body
            };

            let sql = `UPDATE clientHasCar SET ? WHERE idClientHasCar = ${req.params.id}`;
            let query = db.query(sql, updateUserHasCar, (err, result) => {
                if (err) throw err;
                res.send('ClientHasCar updated...');
            });
        }
    });
});

//deleteUserHasCar
router.delete('/:id',(req,res)=>{
    let sqlTest = `SELECT * FROM clientHasCar WHERE idClientHasCar =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `ClientHasCar with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM clientHasCar WHERE idClientHasCar = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('ClientHasCar deleted...');
            });
        }
    });
});;


module.exports = router;