const express = require('express');
const router = express.Router()
const { authenticate, checkAdmin } = require('../middlewares/auth.middleware');
const { getChartData } = require('../controllers/adminController')

router.get('/get-chart-data', authenticate, checkAdmin, getChartData)


module.exports = router;