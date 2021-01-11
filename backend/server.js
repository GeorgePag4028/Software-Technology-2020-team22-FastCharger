const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs =require('fs');
const https =require('https');
const app = express();
const bodyParser = require('body-parser');
//Body Parser Middleware
app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended:true}));



//this takes the createdb route and use this when we use /createdb 
app.use('/database/createdb',require('./routes/database/createdb'));

//this adds the table of the user
app.use('/database/createClientTable',require('./routes/database/createClientTable'));

//this adds the table of the car
app.use('/database/createCarTable',require('./routes/database/createCarTable'));

//this adds the table of the stations
app.use('/database/createStationTable',require('./routes/database/createStationTable'));

//this adds the table of the providers
app.use('/database/createProviderTable',require('./routes/database/createProviderTable'));

//this adds the table of the chargers
app.use('/database/createChargerTable',require('./routes/database/createChargerTable'));





//this adds the table of the StationHostCharger
app.use('/database/createStationHostChargerTable',require('./routes/database/createStationHostChargerTable'));

//this adds the table of the ProviderSuppliesStation
app.use('/database/createProviderSuppliesStationTable',require('./routes/database/createProviderSuppliesStationTable'));

//this adds the table of the StationOffersDiscountCharger
app.use('/database/createStationOffersDiscountChargerTable',require('./routes/database/createStationOffersDiscountChargerTable'));

//this adds the table of the Transcation
app.use('/database/createTransactionTable', require('./routes/database/createTransactionTable'));

//this adds the table of the UserHasCar
app.use('/database/createClientHasCarTable', require('./routes/database/createClientHasCarTable'));

//this adds the table of the CarChargedTransaction
app.use('/database/createCarChargedTransactionTable',require('./routes/database/createCarChargedTransactionTable'));

//all api endpoints 
app.use('/api/client',require('./routes/api/client'));
app.use('/api/car',require('./routes/api/car'));
app.use('/api/provider',require('./routes/api/provider'));
app.use('/api/station',require('./routes/api/station'));
app.use('/api/charger',require('./routes/api/charger'));
app.use('/api/stationHostCharger',require('./routes/api/stationHostCharger'));
app.use('/api/providerSuppliesStation',require('./routes/api/providerSuppliesStation'));
app.use('/api/stationOffersDiscountCharger',require('./routes/api/stationOffersDiscountCharger'));
app.use('/api/transaction',require('./routes/api/transaction'));
app.use('/api/clientHasCar',require('./routes/api/clientHasCar'));
app.use('/api/carChargedTransaction',require('./routes/api/carChargedTransaction'));

//add usage to the application
app.use('/usage/sessionPerCharger',require('./routes/usage/sessionPerCharger'));
app.use('/usage/sessionPerProvider',require('./routes/usage/sessionPerProvider'));
app.use('/usage/sessionPerCar',require('./routes/usage/sessionPerCar'));
app.use('/usage/sessionPerStation',require('./routes/usage/sessionPerStation'));

app.use(express.static("../frontend"));

const PORT = process.env.PORT || 5000;
https.createServer({key:fs.readFileSync('server.key'),cert:fs.readFileSync('server.cert')},app).listen(PORT, () => console.log(`Server started on ${PORT}`));
