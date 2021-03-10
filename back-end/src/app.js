// load dependencies
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
// const date = require('moment');

global.__basedir = __dirname;

// load routes
const adminRoutes = require('./routes/adminRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const authRoutes = require('./routes/authRoutes');

//Sequelize
const sequelize = require('./util/database');

// import database models
const Charger = require('./models/charger');
const Provider = require('./models/provider');
const ProviderSuppliesStation = require('./models/providerSuppliesStation');
const Station = require('./models/station');
const Transaction = require('./models/transaction');
const User = require('./models/user');
const Vehicle = require('./models/vehicle');
const TokenBlacklist = require('./models/tokenBlacklist');
// const userIsStationOperator = require('./models/userIsStationOperator');
// const VehicleChargedTransaction = require('./models/vehicleChargedTransaction');
// const StationHostCharger = require('./models/stationHostCharger');
// const StationOffersDiscountCharger = require('./models/stationOffersDiscountCharger');
// const UserHasVehicle = require('./models/userHasVehicle');

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

// TODO ROUTES
// basic endpoint app.use('/evcharge/api)
app.use('/pog', (req, res, next) => {
  console.log('In the starting point!');
  res.send('<h1>Hello From fuck me up!</h1>');
  next();
});

// login/logout routes
app.use('/evcharge/api', authRoutes);
//admin routes
app.use('/evcharge/api/admin', adminRoutes);
//session routes
app.use('/evcharge/api', sessionRoutes);

// provider suppliers M:N
Provider.belongsToMany(Station, {
  through: ProviderSuppliesStation,
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'CASCADE',
});
Station.belongsToMany(Provider, {
  through: ProviderSuppliesStation,
  foreignKey: 'idProvider',
  constraints: true,
  onDelete: 'CASCADE',
});

// Station - Chargers 1: M
Station.hasMany(Charger, {
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'CASCADE',
});
Charger.belongsTo(Station, {
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'CASCADE',
});

//for stationOffersDiscountCharger.js Station - Discounts M:N
// Station.belongsToMany(Charger, {
//   through: StationOffersDiscountCharger,
//   foreignKey: 'idCharger',
//   constraints: true,
//   onDelete: 'CASCADE',
// });
// Charger.belongsToMany(Station, {
//   through: StationOffersDiscountCharger,
//   foreignKey: 'idStation',
//   constraints: true,
//   onDelete: 'CASCADE',
// });

//for transaction.js  Anything else - Transaction 1 - M
User.hasMany(Transaction, {
  foreignKey: 'idUser',
  constraints: true,
  onDelete: 'CASCADE',
});
Charger.hasMany(Transaction, {
  foreignKey: 'idCharger',
  constraints: true,
  onDelete: 'CASCADE',
});
Transaction.belongsTo(Charger, {
  foreignKey: 'idCharger',
  constraints: true,
  onDelete: 'CASCADE',
});

Station.hasMany(Transaction, {
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'CASCADE',
});
Transaction.belongsTo(Station, {
  foreignKey: 'idStation',
  constraints: true,
  onDelete: 'CASCADE',
});
Provider.hasMany(Transaction, {
  foreignKey: 'idProvider',
  constraints: true,
  onDelete: 'CASCADE',
});
Transaction.belongsTo(Provider, {
  foreignKey: 'idProvider',
  constraints: true,
  onDelete: 'CASCADE',
});
Vehicle.hasMany(Transaction, {
  foreignKey: 'idVehicle',
  constraints: true,
  onDelete: 'CASCADE',
});
Transaction.belongsTo(Vehicle, {
  foreignKey: 'idVehicle',
  constraints: true,
  onDelete: 'CASCADE',
});

// User - Vehicle 1 - M
User.hasMany(Vehicle, {
  foreignKey: 'idUser',
  constraints: true,
  onDelete: 'CASCADE',
});
Vehicle.belongsTo(User, {
  foreignKey: 'idUser',
  constraints: true,
  onDelete: 'CASCADE',
});
// User - Station 1 - M
User.hasMany(Station, {
  foreignKey: 'idStationOperator',
  constraints: true,
  onDelete: 'CASCADE',
});
Station.belongsTo(User, {
  foreignKey: 'idStationOperator',
  constraints: true,
  onDelete: 'CASCADE',
});

console.log('we are in');
sequelize
  .sync({ force: false }) // if i have this on true it drops all tables when it starts
  .then(result => {
    //console.log(result);
    app.listen(8765);
    console.log('we are in');
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

//for userHasVehicle.js
// User.belongsToMany(Vehicle, {
//   through: UserHasVehicle,
//   foreignKey: 'idVehicle',
//   constraints: true,
//   onDelete: 'CASCADE',
// });

// User.hasMany(Vehicle, {
//   through: UserHasVehicle,
//   foreignKey: 'idVehicle',
//   constraints: true,
//   onDelete: 'CASCADE',
// });
// Vehicle.hasOne(User, {
//   through: UserHasVehicle,
//   foreignKey: 'idUser',
//   constraints: true,
//   onDelete: 'CASCADE',
// });

// Vehicle.hasMany(Transaction, {
//   through: VehicleChargedTransaction,
//   foreignKey: 'idVehicle',
//   constraints: true,
//   onDelete: 'CASCADE',
// });

// Transaction.belongsTo(Vehicle, {
//   foreignKey: 'idVehicle',
//   constraints: true,
//   onDelete: 'CASCADE',
// });

//for vehicleChargedTransaction.js
// Vehicle.belongsToMany(Transaction, {
//   through: VehicleChargedTransaction,
//   foreignKey: 'idTransaction',
//   constraints: true,
//   onDelete: 'CASCADE',
// });
// Transaction.hasOne(Vehicle, {
//   through: VehicleChargedTransaction,
//   foreignKey: 'idVehicle',
//   constraints: true,
//   onDelete: 'CASCADE',
// });

//maybe for future use
//db.execute('SELECT * FROM users').then(result => {console.log(result);}).catch(err => {console.log(err);});
//for the database
//this is useless
//const db = require('./util/database');
