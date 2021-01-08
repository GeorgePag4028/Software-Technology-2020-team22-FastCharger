const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db = require("../../dbconnect");

//Gets all
router.get("/:id/:from/:to", (req, res) => {
  const startDate = new Date(`${req.params.from}`);
  const finishDate = new Date(`${req.params.to}`);

  let sql = `SELECT * FROM  charger INNER JOIN transaction INNER JOIN station ON transaction.idStation=station.idStation ON charger.idCharger=transaction.idCharger  WHERE transaction.idStation=${req.params.id} AND transaction.time>=${startDate} AND transaction.time<=${finishDate}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
module.exports = router;
