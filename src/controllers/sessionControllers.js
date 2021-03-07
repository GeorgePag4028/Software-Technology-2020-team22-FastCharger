const Charger = require('../models/charger');
const Station = require('../models/station');
const StationHostCharger = require('../models/stationHostCharger');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Provider = require('../models/provider');
const { Op } = require('sequelize');
const Vehicle = require('../models/vehicle');
const moment = require('moment');
const sequelize = require('sequelize');

const formatDate = givenDate => moment(givenDate).format('YYYY-MM-DD HH:mm:ss');

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
// FOR DATETIME
// var datetime = new Date().today() + ' ' + new Date().timeNow();
Date.prototype.today = function () {
  return (
    this.getFullYear() +
    '-' +
    (this.getMonth() + 1 < 10 ? '0' : '') +
    (this.getMonth() + 1) +
    '-' +
    (this.getDate() < 10 ? '0' : '') +
    this.getDate()
  );
};

function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {}
}
// For the time now
Date.prototype.timeNow = function () {
  return (
    (this.getHours() < 10 ? '0' : '') +
    this.getHours() +
    ':' +
    (this.getMinutes() < 10 ? '0' : '') +
    this.getMinutes() +
    ':' +
    (this.getSeconds() < 10 ? '0' : '') +
    this.getSeconds()
  );
};

//url: localhost:8765/evcharge/api/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to
exports.getSessionsPerPoint = (req, res, next) => {
  let pointID = req.param('pointID');
  let periodFrom = req.param('yyyymmdd_from');
  let periodTo = req.param('yyyymmdd_to');
  let requestTimestamp = new Date().today() + ' ' + new Date().timeNow();
  let pointOperator;
  let numberOfChargingSessions;
  let sessionIndex = [];
  let sessionID = [];
  let startedOn = [];
  let finishedOn = [];
  let protocol = [];
  let energyDelivered = [];
  let paymentMethod = [];
  let vehicleType = [];
  //   finding point operator
  Station.findOne({
    include: {
      model: Charger,
      where: {
        idCharger: pointID,
      },
    },
  })
    .then(charger => {
      pointOperator = charger.name;
      console.log(charger.name);
      console.log(requestTimestamp);
      return Transaction.findAndCountAll({
        // include: {
        //   model: Charger,
        //   where: {
        //     idCharger: pointID,
        //   },
        // },
        include: [
          {
            model: Charger,
            where: { idCharger: pointID },
          },
          {
            model: Vehicle,
          },
        ],
        createdAt: { [Op.between]: [periodFrom, periodTo] },
      });
    })
    .then(({ count, rows }) => {
      numberOfChargingSessions = count;
      for (let index = 0; index < count; index++) {
        sessionIndex.push(index + 1);
        sessionID.push(rows[index].idTransaction);
        finishedOn.push(formatDate(rows[index].createdAt));
        //time
        let integerPart = parseInt((rows[index].time + '').split('.')[0]);
        let decimalPart = parseInt((rows[index].time + '').split('.')[1]);
        var d = rows[index].createdAt;
        d.setMinutes(d.getMinutes() - integerPart);
        d.setSeconds(d.getSeconds() - decimalPart);
        formattedd = formatDate(d);
        startedOn.push(formattedd); //adding it to the list
        //rest
        protocol.push(rows[index].charger.type);
        energyDelivered.push(rows[index].energy);
        paymentMethod.push(rows[index].paymentMethod);
        vehicleType.push(rows[index].vehicle.type);
      }

      //TODO vehicle type
      let answer = {
        Point: pointID,
        PointOperator: pointOperator,
        RequestTimestamp: requestTimestamp,
        PeriodFrom: periodFrom,
        PeriodTo: periodTo,
        NumberOfChargingSessions: numberOfChargingSessions,
        SessionIndex: sessionIndex,
        SessionID: sessionID,
        StartedOn: startedOn,
        FinishedOn: finishedOn,
        Protocol: protocol,
        EnergyDelivered: energyDelivered,
        Payment: paymentMethod,
        VehicleType: vehicleType,
      };
      res.json(answer);
    })
    .catch(err => {
      console.log(err);
    });
  // res.send('<h1>Someone help1!</h1>');
};

// url: localhost:8765/evcharge/api/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to
exports.getSessionsPerStation = (req, res, next) => {
  let stationID = req.param('stationID');
  let periodFrom = req.param('yyyymmdd_from');
  let periodTo = req.param('yyyymmdd_to');
  let operator;
  let requestTimestamp = new Date().today() + ' ' + new Date().timeNow();
  let TotalEnergyDelivered = 0;
  let NumberOfChargingSessions = 0;
  let SessionsSummaryList;
  NumberOfActivePoints = 0;
  let pointID = [];
  User.findOne({
    include: {
      model: Station,
      where: {
        idStation: stationID,
      },
    },
  })
    .then(station => {
      operator = station.username;
      // console.log(operator);
      // return Transaction.findOne({
      return Station.findAndCountAll({
        include: {
          // model: Station,
          model: Transaction,
          where: {
            idStation: stationID,
            createdAt: { [Op.between]: [periodFrom, periodTo] },
          },
        },
      });
    })
    .then(({ count, rows }) => {
      NumberOfChargingSessions = count;
      // console.log('eimai sto proigoumeno');
      for (let index = 0; index < count; index++) {
        TotalEnergyDelivered =
          TotalEnergyDelivered + rows[0].transactions[index].energy;
      }
      return Transaction.findAndCountAll({
        include: {
          model: Station,
          where: {
            idStation: stationID,
          },
        },
        // attributes: [
        //   [sequelize.fn('DISTINCT', sequelize.col('idCharger')), 'charger'],
        // ],
        col: 'idCharger',
        createdAt: { [Op.between]: [periodFrom, periodTo] },
        distinct: true,
      });
    })
    // prepei na ta allaksw gia na ftiaksw thn lista pou zhtaeifdc
    .then(({ count, rows }) => {
      NumberOfActivePoints = count;
      // console.log('active points:', NumberOfActivePoints);
      // console.log('sessions:', NumberOfChargingSessions);
      console.log(rows);
      // console.log(rows[0].station.idStation);
      for (let index = 0; index < count; index++) {
        pointID.push(rows[index].station.idStation);
      }
      // console.log(pointID);
      return Transaction.findAndCountAll({
        include: {
          model: Station,
          where: {
            idStation: stationID,
          },
        },
        createdAt: { [Op.between]: [periodFrom, periodTo] },
      });
    })
    .then(({ count, rows }) => {
      SessionsSummaryList = JSON.stringify(rows);
      console.log(SessionsSummaryList);
      // res.json(rows);
    })

    .catch(err => {
      console.log(err);
      // console.log('User not found or an error occured');
    });
  res.send('<h1>Someone help2!</h1>');
};

//url: localhost:8765/evcharge/api/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to
exports.getSessionsPerEV = (req, res, next) => {
  let vehicleID = req.param('vehicleID');
  let requestTimestamp = new Date().today() + ' ' + new Date().timeNow();
  let periodFrom = req.param('yyyymmdd_from');
  let periodTo = req.param('yyyymmdd_to');
  let totalEnergyConsumed = 0;
  let numberOfVisitedPoints = 0;
  let numberOfVehicleChargingSessions = 0;
  let vehicleChargingSessionsList = [];
  let sessionIndex = [];
  let sessionID = [];
  let energyProvider = [];
  let startedOn = [];
  let finishedOn = [];
  let energyDelivered = [];
  let costPerKWh = [];
  let sessionCost = [];
  Transaction.count({
    include: {
      model: Vehicle,
      where: {
        idVehicle: vehicleID,
      },
    },
    col: 'idVehicle',
    createdAt: { [Op.between]: [periodFrom, periodTo] },
    distinct: true,
  })
    .then(count => {
      // console.log(count);
      numberOfVisitedPoints = count;
      return Transaction.findAndCountAll({
        include: {
          model: Vehicle,
          where: {
            idVehicle: vehicleID,
          },
        },
        createdAt: { [Op.between]: [periodFrom, periodTo] },
      });
    })
    .then(({ count, rows }) => {
      // console.log(rows[index].paymentMethod);
      console.log(count);
      console.log(rows);
      for (let index = 0; index < count; index++) {
        numberOfVehicleChargingSessions++;
        sessionIndex.push(index + 1);
        sessionID.push(rows[index].idTransaction);
        //time
        let integerPart = parseInt((rows[index].time + '').split('.')[0]);
        let decimalPart = parseInt((rows[index].time + '').split('.')[1]);
        var d = rows[index].createdAt;
        d.setMinutes(d.getMinutes() - integerPart);
        d.setSeconds(d.getSeconds() - decimalPart);
        formattedd = formatDate(d);
        startedOn.push(formattedd);
        //rest
        finishedOn.push(rows[index].createdAt);
        energyDelivered.push(rows[index].energy);
        sessionCost.push(rows[index].amount);
        Provider.findAndCountAll({
          include: {
            model: Transaction,
            where: {
              idTransaction: rows[index].idTransaction,
            },
          },
          createdAt: { [Op.between]: [periodFrom, periodTo] },
        })
          .then(({ count, rows }) => {
            // console.log('mphka mesa');
            energyProvider.push(rows[0].name);
            costPerKWh.push(rows[0].priceOnKwh);
            return 3;
          })
          .then(data => {
            // console.log('mphka kai edw');
            if (index == count - 1) {
              sleep(100);
              // console.log('cya');
              let answer = {
                VehicleID: vehicleID,
                RequestTimestamp: requestTimestamp,
                PeriodFrom: periodFrom,
                PeriodTo: periodTo,
                TotalEnergyConsumed: totalEnergyConsumed,
                NumberOfVisitedPoints: numberOfVisitedPoints,
                NumberOfVehicleChargingSessions: numberOfVehicleChargingSessions,
                SessionIndex: sessionIndex,
                SessionID: sessionID,
                EnergyProvider: energyProvider,
                StartedOn: startedOn,
                FinishedOn: finishedOn,
                EnergyDelivered: energyDelivered,
                CostPerKWh: costPerKWh,
                SessionCost: sessionCost,
              };
              res.json(answer);
            }
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
  // res.send('<h1>Someone help1 for 2C endpoint!</h1>');
};
//url: localhost:8765/evcharge/api/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to
exports.getSessionsPerProvider = (req, res, next) => {
  let periodFrom = req.param('yyyymmdd_from');
  let periodTo = req.param('yyyymmdd_to');
  let providerID = req.param('providerID');
  let providerName;
  let stationID = [];
  let sessionID = [];
  let vehicleID = [];
  let startedOn = [];
  let finishedOn = [];
  let energyDelivered = [];
  let costPerKWh;
  let totalCost = 0;
  let sessionCost = [];
  Provider.findOne({
    where: {
      idProvider: providerID,
    },
  })
    .then(provider => {
      providerName = provider.name;
      costPerKWh = provider.priceOnKwh;
      return Transaction.findAndCountAll({
        include: {
          model: Provider,
          where: {
            idProvider: providerID,
          },
        },
        createdAt: { [Op.between]: [periodFrom, periodTo] },
      });
    })
    .then(({ count, rows }) => {
      // console.log(count);
      for (let index = 0; index < count; index++) {
        console.log('time:', rows[index].time);
        stationID.push(rows[index].idStation);
        sessionID.push(rows[index].idTransaction);
        vehicleID.push(rows[index].idVehicle);
        finishedOn.push(formatDate(rows[index].createdAt));
        //TODO
        //time
        let integerPart = parseInt((rows[index].time + '').split('.')[0]);
        let decimalPart = parseInt((rows[index].time + '').split('.')[1]);
        var d = rows[index].createdAt;
        d.setMinutes(d.getMinutes() - integerPart);
        d.setSeconds(d.getSeconds() - decimalPart);
        formattedd = formatDate(d);
        startedOn.push(formattedd); //adding it to the list
        //rest
        energyDelivered.push(rows[index].energy);
        sessionCost.push(rows[index].amount);
        totalCost = totalCost + rows[index].amount;
      }
      // console.log(rows[0]);
      // console.log(stationID);
      // console.log(sessionID);
      // console.log(vehicleID);
      // console.log(finishedOn);
      // console.log(energyDelivered);
      // console.log(costPerKWh);
      // console.log(totalCost);
      let answer = {
        ProviderID: providerID,
        ProviderName: providerName,
        StationID: stationID,
        SessionID: sessionID,
        vehicleID: vehicleID,
        StartedOn: startedOn,
        FinishedOn: finishedOn,
        EnergyDelivered: energyDelivered,
        CostPerKWh: costPerKWh,
        SessionCost: sessionCost,
        TotalCost: totalCost,
      };
      res.json(answer);
    })
    .catch(err => {
      console.log(err);
    });
  // res.send('<h1>Someone help1 for 2d endpoint!</h1>');
};

// exports.getSessionsPerStation = (req, res, next) => {
//   let stationID = req.param('stationID');
//   let periodFrom = req.param('yyyymmdd_from');
//   let periodTo = req.param('yyyymmdd_to');
//   let operator;
//   let requestTimestamp = new Date().today() + ' ' + new Date().timeNow();
//   let TotalEnergyDelivered = 0;
//   let NumberOfChargingSessions = 0;
//   let SessionsSummaryList;
//   NumberOfActivePoints = 0;
//   let pointID = [];
//   User.findOne({
//     include: {
//       model: Station,
//       where: {
//         idStation: stationID,
//       },
//     },
//   })
//     .then(station => {
//       operator = station.username;
//       console.log(operator);
//       // return Transaction.findOne({
//       return Station.findAndCountAll({
//         include: {
//           // model: Station,
//           model: Transaction,
//           where: {
//             idStation: stationID,
//             createdAt: { [Op.between]: [periodFrom, periodTo] },
//           },
//         },
//       });
//     })
//     .then(({ count, rows }) => {
//       NumberOfChargingSessions = count;
//       console.log('eimai sto proigoumeno');
//       for (let index = 0; index < count; index++) {
//         TotalEnergyDelivered =
//           TotalEnergyDelivered + rows[0].transactions[index].energy;
//         // console.log(
//         //   `Energy of transaction ${index}`,
//         //   rows[0].transactions[index].energy
//         // );}
//       }
//       return Transaction.Findcount({
//         include: {
//           model: Station,
//           where: {
//             idStation: stationID,
//           },
//         },
//         col: 'idCharger',
//         createdAt: { [Op.between]: [periodFrom, periodTo] },
//         distinct: true,
//       });
//     })
//     // prepei na ta allaksw gia na ftiaksw thn lista pou zhtaeifdc
//     .then(count => {
//       NumberOfActivePoints = count;
//       for (let index = 0; index < count; index++) {
//         // poinntID.push(count.)
//       }
//       return Transaction.findAndCountAll({
//         include: {
//           model: Station,
//           where: {
//             idStation: stationID,
//           },
//         },
//         createdAt: { [Op.between]: [periodFrom, periodTo] },
//       });
//     })
//     .then(({ count, rows }) => {
//       SessionsSummaryList = JSON.stringify(rows);
//       console.log(SessionsSummaryList);
//       // res.json(rows);
//     })

//     .catch(err => {
//       console.log(err);
//       // console.log('User not found or an error occured');
//     });
//   res.send('<h1>Someone help2!</h1>');
// };

// exports.getSessionsPerPoint = (req, res, next) => {
//   let pointID = req.param('pointID');
//   let periodFrom = req.param('yyyymmdd_from');
//   let periodTo = req.param('yyyymmdd_to');
//   let requestTimestamp = new Date().today() + ' ' + new Date().timeNow();
//   let pointOperator;
//   let numberOfChargingSessions;
//   let sessionIndex = [];
//   let sessionID = [];
//   let startedOn = [];
//   let finishedOn = [];
//   let protocol = [];
//   let energyDelivered = [];
//   let paymentMethod = [];
//   let vehicleType = [];
//   //   finding point operator
//   Station.findOne({
//     include: {
//       model: Charger,
//       where: {
//         idCharger: pointID,
//       },
//     },
//   })
//     .then(charger => {
//       pointOperator = charger.name;
//       console.log(charger.name);
//       console.log(requestTimestamp);
//       return Transaction.findAndCountAll({
//         include: {
//           model: Charger,
//           where: {
//             idCharger: pointID,
//           },
//         },
//         createdAt: { [Op.between]: [periodFrom, periodTo] },
//       });
//     })
//     .then(({ count, rows }) => {
//       numberOfChargingSessions = count;
//       for (let index = 0; index < count; index++) {
//         sessionIndex.push(index + 1);
//         sessionID.push(rows[index].idTransaction);
//         finishedOn.push(formatDate(rows[index].createdAt));
//         //time
//         let integerPart = parseInt((rows[index].time + '').split('.')[0]);
//         let decimalPart = parseInt((rows[index].time + '').split('.')[1]);
//         var d = rows[index].createdAt;
//         d.setMinutes(d.getMinutes() - integerPart);
//         d.setSeconds(d.getSeconds() - decimalPart);
//         formattedd = formatDate(d);
//         startedOn.push(formattedd); //adding it to the list
//         //rest
//         protocol.push(rows[index].charger.type);
//         energyDelivered.push(rows[index].energy);
//         paymentMethod.push(rows[index].paymentMethod);
//       }
//       //TODO vehicle type
//       let answer = {
//         Point: pointID,
//         PointOperator: pointOperator,
//         RequestTimestamp: requestTimestamp,
//         PeriodFrom: periodFrom,
//         PeriodTo: periodTo,
//         NumberOfChargingSessions: numberOfChargingSessions,
//         SessionIndex: sessionIndex,
//         SessionID: sessionID,
//         StartedOn: startedOn,
//         FinishedOn: finishedOn,
//         Protocol: protocol,
//         EnergyDelivered: energyDelivered,
//         Payment: paymentMethod,
//         VehicleType: vehicleType,
//       };
//       res.json(answer);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   // res.send('<h1>Someone help1!</h1>');
// };
