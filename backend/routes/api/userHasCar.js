const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all userHasCars
router.get('/getAllUserHasCars', (req, res) => {
    let sql = 'SELECT * FROM userHasCar';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//Get one userHasCar
router.get('/getUserHasCar/:id', (req, res) => {
    let sql = `SELECT * FROM userHasCar WHERE idUserHasCar =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `UserHasCar~~ with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});

//Create a userHasCar
router.post('/postNewUserHasCar', (req, res) => {
    const newUserHasCar = {
        ...req.body
    };
    if (!newUserHasCar.idUser || !newUserHasCar.idCar) {
        return res.status(400).json({
            msg: 'Please include a idUser and idCar'
        });
    }
    let sql = 'INSERT INTO userHasCar SET ?';
    let query = db.query(sql, newUserHasCar, (err, result) => {
        if (err) throw err;
        res.send('UserHasCar added ...');
    });
});

//updateUserHasCar
router.put('/updateUserHasCar/:id', (req, res) => {
    let sqlTest = `SELECT * FROM userHasCar WHERE idUserHasCar =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `UserHasCar with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateUserHasCar = {
                ...req.body
            };

            let sql = `UPDATE userHasCar SET ? WHERE idUserHasCar = ${req.params.id}`;
            let query = db.query(sql, updateUserHasCar, (err, result) => {
                if (err) throw err;
                res.send('UserHasCar updated...');
            });
        }
    });
});

//deleteUserHasCar
router.delete('/deleteUserHasCar/:id',(req,res)=>{
    let sqlTest = `SELECT * FROM userHasCar WHERE idUserHasCar =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `UserHasCar with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM userHasCar WHERE idUserHasCar = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('UserHasCar deleted...');
            });
        }
    });
});;


module.exports = router;