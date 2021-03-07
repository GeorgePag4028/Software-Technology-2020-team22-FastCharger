const express = require('express');
const sessionControllers = require('../controllers/sessionControllers');

const router = express.Router();

//2a GET {baseURL}/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to
router.get(
  '/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to',
  sessionControllers.getSessionsPerPoint
);

//2b GET {baseURL}/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to
router.get(
  '/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to',
  sessionControllers.getSessionsPerStation
);

// 2c GET {baseURL}/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to
router.get(
  '/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to',
  sessionControllers.getSessionsPerEV
);

//2d GET {baseURL}/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to
router.get(
  '/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to',
  sessionControllers.getSessionsPerProvider
);

module.exports = router;
