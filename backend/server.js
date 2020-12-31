const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();



//this takes the createdb route and use this when we use /createdb 
app.use('/createdb',require('./routes/createdb'));

//this adds the table of the users
app.use('/createUserTable',require('./routes/createUserTable'));

//this adds the table of the cars
app.use('/createUserTable',require('./routes/createCarTable'));

//this adds the table of the stations
app.use('/createUserTable',require('./routes/createStationTable'));

//this adds the table of the providers
app.use('/createUserTable',require('./routes/createProviderTable'));

//this adds the table of the chargers
app.use('/createUserTable',require('./routes/createChargerTable'));

//app.use('/api/members',require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));