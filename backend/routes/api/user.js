const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all users
router.get('/getAllUsers', (req, res) => {
    let sql = 'SELECT * FROM user';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

//Get one user
router.get('/getUser/:id', (req, res) => {
    let sql = `SELECT * FROM user WHERE idUser =${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `User with this id ${req.params.id} doesn't exist.`
        });
        res.json(result);
    });

});

//Create a user
router.post('/postNewUser', (req, res) => {
    const newUser = {
        ...req.body
    };
    if (!newUser.username || !newUser.password || !newUser.rank || !newUser.email) {
        return res.status(400).json({
            msg: 'Please include a username, password, rank and email'
        });
    }
    let sql = 'INSERT INTO user SET ?';
    let query = db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        res.send('User added ...');
    });
});

//updateUser
router.put('/updateUser/:id', (req, res) => {
    let sqlTest = `SELECT * FROM user WHERE idUser =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `User with this id ${req.params.id} doesn't exist.`
        });
        else {
            const updateUser = {
                ...req.body
            };

            let sql = `UPDATE user SET ? WHERE idUser = ${req.params.id}`;
            let query = db.query(sql, updateUser, (err, result) => {
                if (err) throw err;
                res.send('User updated...');
            });
        }
    });
});

//deleteUser
router.delete('/deleteUser/:id', (req, res) => {
    let sqlTest = `SELECT * FROM user WHERE idUser =${req.params.id}`;
    let queryTest = db.query(sqlTest, (err, result) => {
        if (err) throw err
        else if (JSON.stringify(result) === '[]') return res.status(400).json({
            msg: `User with this id ${req.params.id} doesn't exist.`
        });
        else {
            let sql = `DELETE FROM user WHERE idUser = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                res.send('User deleted...');
            });
        }
    });
});


module.exports = router;