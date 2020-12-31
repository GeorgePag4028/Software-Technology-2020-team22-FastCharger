const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();



//this takes the createdb route and use this when we use /createdb 
app.use('/createdb',require('./routes/createdb'));

//this adds the table of the users
app.use('/createUserTable',require('./routes/createUserTable'));

//this adds the table of the car
app.use('/createCarTable',require('./routes/createCarTable'));

app.use('createUserHasCarTable', require('./routes/createUserHasCarTable'));

app.use('createCarChargedTransactionTable',require('./routes/createCarChargedTransactionTable'));

app.use('createStationOffersDiscountChargerTable',require('./routes/createStationOffersDiscountChargerTable'));

//app.use('/api/members',require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));