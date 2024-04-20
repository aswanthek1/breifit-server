const { validationResult } = require("express-validator");
const { createAuthor, findAuthorByCred, updateAuthorById } = require("../helpers/authorHelper");
const HttpException = require("../utils/httpException");
const { cloudinaryUpload } = require("../helpers/upload");
const { AUTHOR_ASSETS_FOLDER_NAME } = require("../constants/constants");
const md5 = require('md5');
const { generateToken } = require("../utils/generateToken");


    exports.checkValidation = (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new HttpException(400, "Validation failed", result.array());
        }
    };

    exports.updateAuthor = async (req, res, next) => {
        try {
            this.checkValidation(req, res)
            if(req.file) {
                const uploadedResult = await cloudinaryUpload(req.file?.path, AUTHOR_ASSETS_FOLDER_NAME)
                if(uploadedResult) {
                    req.body.image = uploadedResult.secure_url
                }
            }
            const userId = req.user?._id
            const data = await updateAuthorById(userId, req.body)
            res.send({
                message: data?.message
            })
        } catch (error) {
            next(error)
        }
    }

    exports.register = async(req, res, next) => {
        try {
            this.checkValidation(req, res)
            const author = await findAuthorByCred({email:req.body?.email})
            if(author) {
                return res.status(400).json({message:'Email already exists.'})
            }
            const hashedPassword = md5(req.body?.password)
            req.body.password = hashedPassword
            const data = await createAuthor(req.body)
            console.log(data)
            res.send(data)
        } catch (error) {
            next(error)
        }
    }

    exports.login = async(req, res, next) => {
        try {
            this.checkValidation(req, res)

            //Hashing the input password
            req.body.password = md5(req.body.password);
            const author = await findAuthorByCred(req.body)
            if(!author) {
                return res.status(400).json({message: 'Invalid Credentials'})
            }
            console.log(author, "author")
            const {accessToken, refreshToken} = await generateToken(author)
            res.cookie('token', accessToken)
            res.send({
                message: 'Logged in successfully.',
                accessToken,
                data: author
            })
        } catch (error) {
            next(error)
        }
    }
