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
        res.json(result);
    });

});
//Create a providerSuppliesStation
router.get('/postNewProviderSuppliesStation', (req, res) => {
    const newProviderSuppliesStation = {
        idStation : '1',
        idProvider : '2'
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
router.get('/updateProviderSuppliesStation/:id', (req, res) => {
    let newIdStation = '2';
    let sql = `UPDATE providerSuppliesStation SET idStation='${newIdStation}' WHERE idProviderSuppliesStation = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('ProviderSuppliesStation updated...');
    });
});
//deleteProviderSuppliesStation
router.get('/deleteProviderSuppliesStation/:id',(req,res)=>{
    let sql = `DELETE FROM providerSuppliesStation WHERE idProviderSuppliesStation = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('ProviderSuppliesStation deleted...');
    });
} );


module.exports = router;