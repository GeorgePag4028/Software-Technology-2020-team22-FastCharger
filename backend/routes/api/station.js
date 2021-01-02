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
        res.json(result);
    });

});
//Create a Station
router.get('/postNewStation', (req, res) => {
    const newStation = {
        country: 'Germany',
        city: 'Berlin',
        street : 'Berlin Ave',
        number:'11',
        name:'Deutche Station',
        telephone:'2100750752',
        mail:'info@Deutche.com',
        website:'Deutche.com'
    };
    if (!newStation.country || !newStation.city || !newStation.street||!newStation.number || !newStation.name || !newStation.telephone||!newStation.mail || !newStation.website ) {
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
router.get('/updateStation/:id', (req, res) => {
    let newCountry = 'France';
    let sql = `UPDATE station SET country='${newCountry}' WHERE idStation = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Station updated...');
    });
});
//deleteStation
router.get('/deleteStation/:id',(req,res)=>{
    let sql = `DELETE FROM station WHERE idStation = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Station deleted...');
    });
} );


module.exports = router;