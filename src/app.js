// load dependencies
const express = require('express');
const bodyParser = require('body-parser');

//for the database
//this is useless
//const db = require('./util/database');

// load routes
const adminRoutes = require('./routes/adminRoutes');
const sequelize = require('./util/database');

const Charger = require('.models/charger');
const Provider = require('.models/provider');
const ProviderSuppliesStation = require('.models/providerSuppliesStation');
const Station = require('.models/station');
const StationHostCharger = require('.models/stationHostCharger');
const StationOffersDiscountCharger = require('.models/stationOffersDiscountCharger');
const Transaction = require('.models/transaction');
const User = require('.models/user');
const userHasVehicle = require('.models/userHasVehicle');
const vehicle = require('.models/vehicle');
const VehicleChargedTransaction = require('.models/vehicleChargedTransaction');


const app = express();

//maybe for future use
//db.execute('SELECT * FROM users').then(result => {console.log(result);}).catch(err => {console.log(err);});

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

//for providerSuppliesStation.js
Provider.belongsToMany(Station, {through: ProviderSuppliesStation, foreignKey:'idStation' , constraints: true, onDelete: 'CASCADE'});
Station.belongsToMany(Provider, {through: ProviderSuppliesStation, foreignKey:'idProvider' , constraints: true, onDelete: 'CASCADE'});

//for stationHostCharger.js
Station.belongsToMany(Charger, {through: StationHostCharger, foreignKey:'idCharger' , constraints: true, onDelete: 'CASCADE'});
Charger.belongsToMany(Station, {through: StationHostCharger, foreignKey:'idStation' , constraints: true, onDelete: 'CASCADE'});

//for stationOffersDiscountCharger.js
Station.belongsToMany(Charger, {through: StationOffersDiscountCharger, foreignKey:'idCharger' , constraints: true, onDelete: 'CASCADE'});
Charger.belongsToMany(Station, {through: StationOffersDiscountCharger, foreignKey:'idStation' , constraints: true, onDelete: 'CASCADE'});

//for transaction.js
User.hasMany(Transaction, {foreignKey: 'idUser', constraints: true, onDelete: 'CASCADE'});
Charger.hasMany(Transaction, {foreignKey: 'idCharger', constraints: true, onDelete: 'CASCADE'});
Station.hasMany(Transaction, {foreignKey: 'idStation', constraints: true, onDelete: 'CASCADE'});
Provider.hasMany(Transaction, {foreignKey: 'idProvider', constraints: true, onDelete: 'CASCADE'});

//for userHasVehicle.js
User.hasMany(Vehicle, {through: UserHasVehicle, foreignKey: 'idVehicle', constraints: true, onDelete: 'CASCADE'});
Vehicle.hasOne(User, {through: UserHasVehicle, foreignKey: 'idUser', constraints: true, onDelete: 'CASCADE'});

//for vehicleChargedTransaction.js
Vehicle.hasMany(Transaction, {through: VehicleChargedTransaction, foreignKey: 'idTransaction', constraints: true, onDelete: 'CASCADE'});
Transaction.hasOne(Vehicle, {through: VehicleChargedTransaction, foreignKey: 'idVehicle', constraints: true, onDelete: 'CASCADE'});



//one of these 2 should work
//uncomment one of 2
sequelize .sync({ force: true }) 
.then(result => {
  //console.log(result);
app.listen(8765);
})
.catch(err => {
  console.log(err);
}); 

/*sequelize .sync() .then(result => {
  //console.log(result);
  app.listen(3306);
})
.catch(err => {
  console.log(err);
}); */

//we maybe need to erase this if we add one of 2 above
//app.listen(8765);
console.log('we are in');
