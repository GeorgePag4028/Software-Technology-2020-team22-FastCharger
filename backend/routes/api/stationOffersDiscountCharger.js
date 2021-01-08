const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all stationOffersDiscountChargers
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM stationOffersDiscountCharger';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//Get one stationOffersDiscountCharger
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM stationOffersDiscountCharger WHERE idStationOffersDiscountCharger =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `StationOffersDiscountCharger with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});

//Create a stationOffersDiscountCharger
router.post('/', (req, res) => {
    const newStationOffersDiscountCharger = {
        ...req.body
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
router.put('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM stationOffersDiscountCharger WHERE idStationOffersDiscountCharger =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `StationOffersDiscountCharger with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateStationOffersDiscountCharger = {
                ...req.body
            };

            let sql = `UPDATE stationOffersDiscountCharger SET ? WHERE idStationOffersDiscountCharger = ${req.params.id}`;
            let query = db.query(sql, updateStationOffersDiscountCharger, (err, result) => {
                if (err) throw err;
                res.send('StationOffersDiscountCharger updated...');
            });
        }
    });
});

//deleteStationOffersDiscountCharger
router.delete('/:id',(req,res)=>{
    let sqlTest = `SELECT * FROM stationOffersDiscountCharger WHERE idStationOffersDiscountCharger =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `StationOffersDiscountCharger with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM stationOffersDiscountCharger WHERE idStationOffersDiscountCharger = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('StationOffersDiscountCharger deleted...');
            });
        }
    });
});


module.exports = router;