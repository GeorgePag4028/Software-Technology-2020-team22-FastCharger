const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all
router.get('/:id/:from/:to', (req, res) => {
    const startDate = new Date(`${req.params.from}`);
    const finishDate = new Date(`${req.params.to}`);

    let sql = `SELECT * FROM  transaction INNER JOIN car ON transaction.idCar=car.idCar  WHERE transaction.idCar=${req.params.id} AND transaction.time>=${startDate} AND transaction.time<=${finishDate}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
module.exports = router;