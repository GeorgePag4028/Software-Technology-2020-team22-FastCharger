const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db = require("../../dbconnect");
const moment = require("moment");
//Gets all
router.get("/:id/:from/:to", (req, res) => {
  let startDate= moment(`${req.params.from}`).format("yyyy-MM-DD HH:mm:ss");
  let finishDate = moment(`${req.params.to}`).format("yyyy-MM-DD HH:mm:ss");

 let sql=`SELECT * FROM  charger INNER JOIN(transaction INNER JOIN station ON transaction.idStation=station.idStation) ON charger.idCharger=transaction.idCharger  WHERE transaction.idStation=${req.params.id} AND transaction.time>='${startDate}' AND transaction.time<='${finishDate}'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
module.exports = router;
