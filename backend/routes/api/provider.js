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
        res.json(result);
    });

});
//Create a provider
router.get('/postNewProvider', (req, res) => {
    const newProvider = {
        pricesOnKwh: '0.08',
        name: 'iron',
        telephone : '210 6969 400',
        mail: "info@iron.com"       ,
        website :"iron.com"
    };
    if (!newProvider.pricesOnKwh || !newProvider.name || !newProvider.telephone||!newProvider.mail||!newProvider.website) {
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
router.get('/updateProvider/:id', (req, res) => {
    let PricesOnKwh = '0.8';
    let sql = `UPDATE provider SET pricesOnKwh='${PricesOnKwh}' WHERE idProvider = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Provider updated...');
    });
});
//deleteProvider
router.get('/deleteProvider/:id',(req,res)=>{
    let sql = `DELETE FROM provider WHERE idProvider = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Provider deleted...');
    });
} );


module.exports = router;