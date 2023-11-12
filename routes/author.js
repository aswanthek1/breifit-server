const express = require('express')
const router = express.Router()
const multer = require("multer")
const { create } = require('../controllers/authorController')
const { createAuthorSchema } = require('../middlewares/validators/authorValidators')

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    filename: function(req, file , cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage, limits: { fileSize: 2e+7 } })

router.post("/create", upload.single('image'), createAuthorSchema, create)



module.exports = router;