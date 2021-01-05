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
        res.json(result);
    });

});
//Create a userHasCar
router.get('/postNewUserHasCar', (req, res) => {
    const newUserHasCar = {
        idUser: '2',
        idCar: '1'
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
router.get('/updateUserHasCar/:id', (req, res) => {
    let newIdUser = '2';
    let sql = `UPDATE userHasCar SET idUser='${newIdUser}' WHERE idUserHasCar = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('UserHasCar updated...');
    });
});
//deleteUserHasCar
router.get('/deleteUserHasCar/:id',(req,res)=>{
    let sql = `DELETE FROM userHasCar WHERE idUserHasCar = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('UserHasCar deleted...');
    });
} );


module.exports = router;