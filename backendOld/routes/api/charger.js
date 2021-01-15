const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all Charger
router.get('/', (req, res) => {
    let sql = 'SELECT *FROM charger';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});
//Get one user
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM charger WHERE idCharger =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Charger with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});
//Create a user
router.post('/', (req, res) => {
    const newCharger = {
        ...req.body
    };
    if (!newCharger.brand || !newCharger.type||!newCharger.idChargerOperator) {
        return res.status(400).json({
            msg: 'Please include a brand,type'
        });
    }
    let sql = 'INSERT INTO charger SET ?';
    let query = db.query(sql, newCharger, (err, result) => {
        if (err) throw err;
        res.send('Charger added ...');
    });
});
//updateUser
router.put('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM charger WHERE idCharger =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Charger with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateCharger = {
                ...req.body
            };

            let sql = `UPDATE charger SET ? WHERE idCharger = ${req.params.id}`;
            let query = db.query(sql, updateCharger, (err, result) => {
                if (err) throw err;
                res.send('Charger updated...');
            });
        }
    });
});
//deleteUser
router.delete('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM charger WHERE idCharger =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Charger with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM charger WHERE idCharger = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('Charger deleted...');
            });
        }
    });
});


module.exports = router;
