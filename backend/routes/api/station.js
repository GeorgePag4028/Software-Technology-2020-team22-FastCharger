const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all Station
router.get('/getAllStations', (req, res) => {
    let sql = 'SELECT *FROM station';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one Station
router.get('/getStation/:id', (req, res) => {
    let sql = `SELECT * FROM station WHERE idStation =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Station with this id ${req.params.id} doesn't exits.`
        });
        res.json(result);
    });

});
//Create a Station
router.post('/postNewStation', (req, res) => {
    const newStation = {
        ...req.body
    };
    if (!newStation.country || !newStation.city || !newStation.street || !newStation.number || !newStation.name || !newStation.telephone || !newStation.mail || !newStation.website) {
        return res.status(400).json({
            msg: 'Please include a country,city,street,number,name,telephone,mail,website'
        });
    }
    let sql = 'INSERT INTO station SET ?';
    let query = db.query(sql, newStation, (err, result) => {
        if (err) throw err;
        res.send('Station added ...');
    });
});
//updateStation
router.put('/updateStation/:id', (req, res) => {
    let sqlTest = `SELECT * FROM station WHERE idStation =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Station with this id ${req.params.id} doesn't exits.`
        });
        else {
            const updateUser = {
                ...req.body
            };

            let sql = `UPDATE station SET ? WHERE idStation = ${req.params.id}`;
            let query = db.query(sql, updateUser, (err, result) => {
                if (err) throw err;
                res.send('Station updated...');
            });
        }
    });
});
//deleteStation
router.delete('/deleteStation/:id', (req, res) => {
    let sqlTest = `SELECT * FROM station WHERE idStation =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Station with this id ${req.params.id} doesn't exits.`
        });
        else {
            let sql = `DELETE FROM station WHERE idStation = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('Station deleted...');
            });
        }
    });
});


module.exports = router;