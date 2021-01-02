const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all Charger
router.get('/getAllChargers', (req, res) => {
    let sql = 'SELECT *FROM charger';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one user
router.get('/getCharger/:id', (req, res) => {
    let sql = `SELECT * FROM charger WHERE idCharger =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    });

});
//Create a user
router.get('/postNewCharger', (req, res) => {
    const newCharger = {
        brand: '1aa',
        type: 'AC',
        isBusy : true,
        isFunctioning: true
    };
    if (!newCharger.brand || !newCharger.type || !newCharger.isBusy||!newCharger.isFunctioning) {
        return res.status(400).json({
            msg: 'Please include a brand,type,isBusy,isFunctioning'
        });
    }
    let sql = 'INSERT INTO charger SET ?';
    let query = db.query(sql, newCharger, (err, result) => {
        if (err) throw err;
        res.send('Charger added ...');
    });
});
//updateUser
router.get('/updateCharger/:id', (req, res) => {
    let newBrand = 'Alkalik';
    let sql = `UPDATE charger SET brand='${newBrand}' WHERE idCharger = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Charger updated...');
    });
});
//deleteUser
router.get('/deleteCharger/:id',(req,res)=>{
    let sql = `DELETE FROM charger WHERE idCharger = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Charger deleted...');
    });
} );


module.exports = router;