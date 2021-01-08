const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../dbconnect');

//Gets all
router.get('/:id/:from/:to', (req, res) => {
    const startDate = new Date(`${req.params.from}`);
    const finishDate = new Date(`${req.params.to}`);

    let sql = `SELECT * FROM transaction INNER JOIN station INNER JOIN providerSuppliesStation INNER JOIN provider providerSuppliesStation.idProvider=provider.idProvider ON station.idStation=providerSuppliesStation.idStation ON transaction.idStation=station.idStation `;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
module.exports = router;