const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all Providers
router.get('/getAllProviders', (req, res) => {
    let sql = 'SELECT * FROM provider';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one provider
router.get('/getProvider/:id', (req, res) => {

    let sql = `SELECT * FROM provider WHERE idProvider =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Provider with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});
//Create a provider
router.post('/postNewProvider', (req, res) => {
    const newProvider = {
        ...req.body
    };
    if (!newProvider.pricesOnKwh || !newProvider.name || !newProvider.telephone || !newProvider.mail || !newProvider.website) {
        return res.status(400).json({
            msg: 'Please include a pricesOnKwh,name,telephone,mail,website'
        });
    }
    let sql = 'INSERT INTO provider SET ?';
    let query = db.query(sql, newProvider, (err, result) => {
        if (err) throw err;
        res.send('Provider added ...');
    });
});
//updateProvider
router.put('/updateProvider/:id', (req, res) => {
    let sqlTest = `SELECT * FROM provider WHERE idProvider =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Provider with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateProvider = {
                ...req.body
            };

            let sql = `UPDATE provider SET ? WHERE idProvider = ${req.params.id}`;
            let query = db.query(sql, updateProvider, (err, result) => {
                if (err) throw err;
                res.send('Provider updated...');
            });
        }
    });
});
//deleteProvider
router.delete('/deleteProvider/:id', (req, res) => {
    let sqlTest = `SELECT * FROM provider WHERE idProvider =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Provider with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM provider WHERE idProvider = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('Provider deleted...');
            });
        }
    });
});


module.exports = router;