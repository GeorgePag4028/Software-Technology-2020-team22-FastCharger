const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all users
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM client';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//Get one user
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM client WHERE idClient =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Client with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});

//Create a user
router.post('/', (req, res) => {
    const newClient = {
        ...req.body
    };
    if (!newClient.username || !newClient.passwordClient || !newClient.rankClient || !newClient.email) {
        return res.status(400).json({
            msg: 'Please include a username, passwordClient, rankClient and email'
        });
    }
    let sql = 'INSERT INTO client SET ?';
    let query = db.query(sql, newClient, (err, result) => {
        if (err) throw err;
        res.send('Client added ...');
    });
});

//updateUser
router.put('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM client WHERE idClient =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Client with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateClient = {
                ...req.body
            };

            let sql = `UPDATE client SET ? WHERE idClient = ${req.params.id}`;
            let query = db.query(sql, updateClient, (err, result) => {
                if (err) throw err;
                res.send('Client updated...');
            });
        }
    });
});

//deleteUser
router.delete('/:id', (req, res) => {
    let sqlTest = `SELECT * FROM client WHERE idClient =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `Client with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM client WHERE idClient = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('Client deleted...');
            });
        }
    });
});


module.exports = router;