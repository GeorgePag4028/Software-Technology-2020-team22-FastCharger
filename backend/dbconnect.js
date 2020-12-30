//const express = require('express');

const mysql = require('mysql');
const settings = require('./settingsdbconnect.json');



function connectDatabase() {
    //Create a connection
    const db = mysql.createConnection(settings);

    db.connect((err) => {
        if (err) throw err;
        console.log('Mysql connected ...');
    });

    return db;
}

module.exports = connectDatabase();