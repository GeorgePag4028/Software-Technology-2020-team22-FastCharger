//const mysql = require('mysql2');
//
//const pool = mysql.createPool({
//    host: 'localhost',
//    user: 'root',
//    database: 'carApp',
//    password: '123123123'
//});

//module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('carApp', 'root', '123123123', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;