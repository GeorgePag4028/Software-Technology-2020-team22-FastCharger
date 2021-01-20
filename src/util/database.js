//const mysql = require('mysql2');
//
//const pool = mysql.createPool({
//    host: 'localhost',
//    user: 'root',
//    database: 'carApp',
//    password: 'Kappa123!'
//});

//module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('carApp', 'root', 'Kappa123!', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
