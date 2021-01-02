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
        res.json(result);
    });

});
//Create a user
router.get('/postNewUser', (req, res) => {
    const newUser = {
        rank: 'senior',
        username: 'Pagonis',
        password : '1234567'
    };
    if (!newUser.username || !newUser.password || !newUser.rank) {
        return res.status(400).json({
            msg: 'Please include a username,password,and rank'
        });
    }
    let sql = 'INSERT INTO user SET ?';
    let query = db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        res.send('User added ...');
    });
});
//updateUser
router.get('/updateUser/:id', (req, res) => {
    let newUserName = 'Giannis';
    let sql = `UPDATE user SET username='${newUserName}' WHERE idUser = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User updated...');
    });
});
//deleteUser
router.get('/deleteUser/:id',(req,res)=>{
    let sql = `DELETE FROM user WHERE idUser = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('User deleted...');
    });
} );


module.exports = router;