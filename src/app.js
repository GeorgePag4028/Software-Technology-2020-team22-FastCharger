// load dependencies
const express = require('express');
const bodyParser = require('body-parser');

//for the database
const db = require('./util.database');

// load routes
const adminRoutes = require('./routes/adminRoutes');

const app = express();

//maybe for future use
db.execute('SELECT * FROM users').then(result => {console.log(result);}).catch(err => {console.log(err);});

//Midleware for parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting up cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//routes
// basic endpoint app.use('/evcharge/api)

//admin routes
app.use('/evcharge/api/admin', adminRoutes);

app.listen(8765);
console.log('we are in');
