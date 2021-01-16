const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// POST {baseURL}/admin/usermod/:username/:password
router.post('/usermod/:username/:password', adminController.postUser);

router.post('/usermod', adminController.postUser);

// // GET {baseURL}/admin/users/:username
router.get('/users/:username', adminController.getUser);

// // POST {baseURL}/admin/system/sessionsupd
router.post('/system/sessionsupd', adminController.postFileUpload);

module.exports = router;
