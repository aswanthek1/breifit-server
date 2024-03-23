const express = require('express');
const router = express.Router()
const { authenticate, checkAdmin } = require('../middlewares/auth.middleware');
const { getChartData, getUsersData } = require('../controllers/adminController')

router.get('/get-chart-data', authenticate, checkAdmin, getChartData)

router.get('/get-users', authenticate, checkAdmin, getUsersData)



module.exports = router;