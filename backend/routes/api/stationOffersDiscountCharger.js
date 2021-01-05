const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all stationOffersDiscountChargers
router.get('/getAllStationOffersDiscountChargers', (req, res) => {
    let sql = 'SELECT * FROM stationOffersDiscountCharger';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one stationOffersDiscountCharger
router.get('/getStationOffersDiscountCharger/:id', (req, res) => {
    let sql = `SELECT * FROM stationOffersDiscountCharger WHERE idStationOffersDiscountCharger =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    });

});
//Create a stationOffersDiscountCharger
router.get('/postNewStationOffersDiscountCharger', (req, res) => {
    const newStationOffersDiscountCharger = {
        idStation: '1',
        idCharger: '1',
        discount : '1.1'
    };
    if (!newStationOffersDiscountCharger.idStation || !newStationOffersDiscountCharger.idCharger || !newStationOffersDiscountCharger.discount) {
        return res.status(400).json({
            msg: 'Please include a idStation, idCharger and discount'
        });
    }
    let sql = 'INSERT INTO stationOffersDiscountCharger SET ?';
    let query = db.query(sql, newStationOffersDiscountCharger, (err, result) => {
        if (err) throw err;
        res.send('StationOffersDiscountCharger added ...');
    });
});
//updateStationOffersDiscountCharger
router.get('/updateStationOffersDiscountCharger/:id', (req, res) => {
    let newDiscount = '2.1';
    let sql = `UPDATE stationOffersDiscountCharger SET discount='${newDiscount}' WHERE idStationOffersDiscountCharger = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('StationOffersDiscountCharger updated...');
    });
});
//deleteStationOffersDiscountCharger
router.get('/deleteStationOffersDiscountCharger/:id',(req,res)=>{
    let sql = `DELETE FROM stationOffersDiscountCharger WHERE idStationOffersDiscountCharger = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('StationOffersDiscountCharger deleted...');
    });
} );


module.exports = router;