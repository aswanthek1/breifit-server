const express = require('express')
const router = express.Router()
const multer = require("multer")
const { 
    create,
    register,
    login
 } = require('../controllers/authorController')
const { createAuthorSchema, registerAuthorSchema, loginAuthorSchema } = require('../middlewares/validators/authorValidators')

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    filename: function(req, file , cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage, limits: { fileSize: 2e+7 } })


// register author
router.post("/register", registerAuthorSchema, register)

// loging author
router.post('/login', loginAuthorSchema, login )

router.post("/create", upload.single('image'), createAuthorSchema, create)



module.exports = router;