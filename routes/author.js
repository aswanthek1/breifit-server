const express = require('express')
const router = express.Router()
const multer = require("multer")
const { 
    updateAuthor,
    register,
    login
 } = require('../controllers/authorController')
const { createAuthorSchema, registerAuthorSchema, loginAuthorSchema } = require('../middlewares/validators/authorValidators')
const { authenticateUser } = require('../controllers/authController')
const { authenticate } = require('../middlewares/auth.middleware')

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    filename: function(req, file , cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage, limits: { fileSize: 2e+7 } })

// authenitication
router.get('/authenticate', authenticateUser)

// register author
router.post("/register", registerAuthorSchema, register)

// loging author
router.post('/login', loginAuthorSchema, login )

router.put("/edit", authenticate, upload.single('image'), createAuthorSchema, updateAuthor)



module.exports = router;