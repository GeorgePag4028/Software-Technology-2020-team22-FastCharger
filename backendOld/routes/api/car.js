const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all car
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM car';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one car
router.get('/:id', (req, res) => {

    let sql = `SELECT * FROM car WHERE idCar =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Car with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });


});
//Create a car
router.post('/', (req, res) => {
    const newCar = {
        ...req.body

    };
    if (!newCar.type || !newCar.brand || !newCar.kilometres || !newCar.model || !newCar.releaseYear || !newCar.usableBatterySize) {
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
router.put('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM car WHERE idCar =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `User with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateCar = {
                ...req.body
            };
		console.log(updateCar);
            let sql = `UPDATE car SET ? WHERE idCar = ${req.params.id}`;
            let query = db.query(sql,updateCar, (err, result) => {
                if (err) throw err;
                res.send('Car updated...');
            });

        }


    });
});
//deleteCar
router.delete('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM car WHERE idCar =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Car with this id ${req.params.id} doesn't exits.`
        });
        else {
            let sql = `DELETE FROM car WHERE idCar = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('Car deleted...');
            });
        }
    });
});


module.exports = router;
