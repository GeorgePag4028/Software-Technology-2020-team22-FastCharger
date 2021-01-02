const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all car
router.get('/getAllCars', (req, res) => {
    let sql = 'SELECT *FROM car';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one car
router.get('/getCar/:id', (req, res) => {
    let sql = `SELECT * FROM car WHERE idCar =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    });

});
//Create a car
router.get('/postNewCar', (req, res) => {
    const newCar = {
        type: 'Coupe',
        brand: 'M4',
        kilometres : '5000',
        model: 'X5',
        releaseYear : '2019-11-11 13:23:44',
        usableBatterySize : '97kWh'
        
    };
    if (!newCar.type || !newCar.brand || !newCar.kilometres||!newCar.model ||!newCar.releaseYear ||!newCar.usableBatterySize ) {
        return res.status(400).json({
            msg: 'Please include a type,brand,and kilometres,model,releaseYear,usableBatterySize'
        });
    }
    let sql = 'INSERT INTO car SET ?';
    let query = db.query(sql, newCar, (err, result) => {
        if (err) throw err;
        res.send('Car added ...');
    });
});
//updateCar
router.get('/updateCar/:id', (req, res) => {
    let newCarKilometres = '6000';
    let sql = `UPDATE car SET kilometres='${newCarKilometres}' WHERE idCar = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Car updated...');
    });
});
//deleteCar
router.get('/deleteCar/:id',(req,res)=>{
    let sql = `DELETE FROM car WHERE idCar = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Car deleted...');
    });
} );


module.exports = router;