const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//this takes the createdb route and use this when we use /createdb 
app.use('/database/createdb',require('./routes/database/createdb'));

//this adds the table of the user
app.use('/database/createUserTable',require('./routes/database/createUserTable'));

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
app.use('/database/createUserHasCarTable', require('./routes/database/createUserHasCarTable'));

//this adds the table of the CarChargedTransaction
app.use('/database/createCarChargedTransactionTable',require('./routes/database/createCarChargedTransactionTable'));

app.use('/api/user',require('./routes/api/user'));
app.use('/api/car',require('./routes/api/car'));
app.use('/api/provider',require('./routes/api/provider'));
app.use('/api/station',require('./routes/api/station'));
app.use('/api/charger',require('./routes/api/charger'));
app.use('/api/stationHostCharger',require('./routes/api/stationHostCharger'));
app.use('/api/providerSuppliesStation',require('./routes/api/providerSuppliesStation'));
app.use('/api/stationOffersDiscountCharger',require('./routes/api/stationOffersDiscountCharger'));
app.use('/api/transaction',require('./routes/api/transaction'));
app.use('/api/userHasCar',require('./routes/api/userHasCar'));
app.use('/api/carChargedTransaction',require('./routes/api/carChargedTransaction'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));