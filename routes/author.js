const express = require('express')
const router = express.Router()
const { create } = require('../controllers/authorController')
const { createAuthorSchema } = require('../middlewares/validators/authorValidators')


router.post("/create", createAuthorSchema, create)



module.exports = router;