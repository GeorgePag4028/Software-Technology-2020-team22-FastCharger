const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all stationHostChargers
router.get('/getAllStationHostChargers', (req, res) => {
    let sql = 'SELECT * FROM stationHostCharger';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one stationHostCharger
router.get('/getStationHostCharger/:id', (req, res) => {
    let sql = `SELECT * FROM stationHostCharger WHERE idStationHostCharger =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    });

});
//Create a stationHostCharger
router.get('/postNewStationHostCharger', (req, res) => {
    const newStationHostCharger = {
        idStation : '1',
        idCharger : '1'
    };
    if (!newStationHostCharger.idStation || !newStationHostCharger.idCharger) {
        return res.status(400).json({
            msg: 'Please include a idStation and idCharger'
        });
    }
    let sql = 'INSERT INTO stationHostCharger SET ?';
    let query = db.query(sql, newStationHostCharger, (err, result) => {
        if (err) throw err;
        res.send('StationHostCharger added ...');
    });
});
//updateStationHostCharger
router.get('/updateStationHostCharger/:id', (req, res) => {
    let newIdStation = '2';
    let sql = `UPDATE stationHostCharger SET idStation='${newIdStation}' WHERE idStationHostCharger = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('StationHostCharger updated...');
    });
});
//deleteStationHostCharger
router.get('/deleteStationHostCharger/:id',(req,res)=>{
    let sql = `DELETE FROM stationHostCharger WHERE idStationHostCharger = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('StationHostCharger deleted...');
    });
} );


module.exports = router;