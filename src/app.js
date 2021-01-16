// load dependencies
const express = require('express');
const bodyParser = require('body-parser');

// load routes
const adminRoutes = require('./routes/adminRoutes');

const app = express();

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
