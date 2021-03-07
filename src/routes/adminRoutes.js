const express = require('express');
const adminController = require('../controllers/adminControllers');

const router = express.Router();

const upload = require('../middleware/upload');
const csvController = require('../controllers/csv.controller');

// POST {baseURL}/admin/usermod/:username/:password
router.post('/usermod/:username/:password', adminController.postUser);

router.post('/usermod', adminController.postUser);

// // GET {baseURL}/admin/users/:username
router.get('/users/:username', adminController.getUser);

// // POST {baseURL}/admin/system/sessionsupd
// router.post('/system/sessionsupd', adminController.postFileUpload);

router.post('/system/sessionsupd', upload.single('file'), csvController.upload);
router.get('/api/csv/tutorials', csvController.getVehicleChargedTransaction);

// βοηθητικά endpoints
router.get('/healthcheck', adminController.getHealthcheck);
router.get('/resetSessions', adminController.getResetSessions);

module.exports = router;
