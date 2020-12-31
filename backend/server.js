const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();



//this takes the createdb route and use this when we use /createdb 
app.use('/createdb',require('./routes/createdb'));







//app.use('/api/members',require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));