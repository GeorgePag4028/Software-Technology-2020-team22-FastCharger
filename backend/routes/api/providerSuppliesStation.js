const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all providerSuppliesStation
router.get('/getAllProviderSuppliesStations', (req, res) => {
    let sql = 'SELECT * FROM providerSuppliesStation';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//Get one providerSuppliesStation
router.get('/getProviderSuppliesStation/:id', (req, res) => {
    let sql = `SELECT * FROM providerSuppliesStation WHERE idProviderSuppliesStation =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `ProviderSuppliesStation with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});

//Create a providerSuppliesStation
router.post('/postNewProviderSuppliesStation', (req, res) => {
    const newProviderSuppliesStation = {
        ...req.body
    };
    if (!newProviderSuppliesStation.idStation || !newProviderSuppliesStation.idProvider) {
        return res.status(400).json({
            msg: 'Please include a idStation and idProvider'
        });
    }
    let sql = 'INSERT INTO providerSuppliesStation SET ?';
    let query = db.query(sql, newProviderSuppliesStation, (err, result) => {
        if (err) throw err;
        res.send('ProviderSuppliesStation added ...');
    });
});

//updateProviderSuppliesStation
router.put('/updateProviderSuppliesStation/:id', (req, res) => {
    let sqlTest = `SELECT * FROM providerSuppliesStation WHERE idProviderSuppliesStation =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `ProviderSuppliesStation with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateProviderSuppliesStation = {
                ...req.body
            };

            let sql = `UPDATE providerSuppliesStation SET ? WHERE idProviderSuppliesStation = ${req.params.id}`;
            let query = db.query(sql, updateProviderSuppliesStation, (err, result) => {
                if (err) throw err;
                res.send('ProviderSuppliesStation~ updated...');
            });
        }
    });
});

//deleteProviderSuppliesStation
router.delete('/deleteProviderSuppliesStation/:id',(req,res)=>{
    let sqlTest = `SELECT * FROM providerSuppliesStation WHERE idProviderSuppliesStation =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `ProviderSuppliesStation with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM providerSuppliesStation WHERE idProviderSuppliesStation = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('ProviderSuppliesStation deleted...');
            });
        }
    });
});



module.exports = router;