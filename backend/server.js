const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();



//this takes the createdb route and use this when we use /createdb 
app.use('/createdb',require('./routes/createdb'));

//this adds the table of the cars
app.use('/createUserTable',require('./routes/createCarTable'));

//this adds the table of the stations
app.use('/createUserTable',require('./routes/createStationTable'));

//this adds the table of the providers
app.use('/createUserTable',require('./routes/createProviderTable'));

//this adds the table of the chargers
app.use('/createUserTable',require('./routes/createChargerTable'));

//this adds the table of the User
app.use('/createUserTable',require('./routes/createUserTable'));

//this adds the table of the Car
app.use('/createCarTable',require('./routes/createCarTable'));

//this adds the table of the StationHostCharger
app.use('createStationHostChargerTable',require('./routes/createStationHostChargerTable'));

//this adds the table of the ProviderSuppliesStation
app.use('createProviderSuppliesStationTable',require('./routes/createProviderSuppliesStationTable'));

//this adds the table of the StationOffersDiscountCharger
app.use('createStationOffersDiscountChargerTable',require('./routes/createStationOffersDiscountChargerTable'));

//this adds the table of the Transcations
app.use('createTranscationsTable', require('./routes/createTranscationsTable'));

//this adds the table of the UserHasCar
app.use('createUserHasCarTable', require('./routes/createUserHasCarTable'));

//this adds the table of the CarChargedTransaction
app.use('createCarChargedTransactionTable',require('./routes/createCarChargedTransactionTable'));

//app.use('/api/members',require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));