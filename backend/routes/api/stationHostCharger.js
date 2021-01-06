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
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `StationHostCharger with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});

//Create a stationHostCharger
router.post('/postNewStationHostCharger', (req, res) => {
    const newStationHostCharger = {
        ...req.body
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
router.put('/updateStationHostCharger/:id', (req, res) => {
    let sqlTest = `SELECT * FROM stationHostCharger where idStationHostCharger =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `StationHostCharger with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateStationHostCharger = {
                ...req.body
            };

            let sql = `UPDATE stationHostCharger SET ? WHERE idStationHostCharger = ${req.params.id}`;
            let query = db.query(sql, updateStationHostCharger, (err, result) => {
                if (err) throw err;
                res.send('StationHostCharger updated...');
            });
        }
    });
});


//deleteStationHostCharger
router.delete('/deleteStationHostCharger/:id',(req,res)=>{
    let sqlTest = `DELETE FROM stationHostCharger WHERE idStationHostCharger = ${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `StationHostCharger with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM stationHostCharger WHERE idStationHostCharger = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('StationHostCharger deleted...');
            });
        }
    });
});


module.exports = router;