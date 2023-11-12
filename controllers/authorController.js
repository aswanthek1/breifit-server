const { validationResult } = require("express-validator");
const { createAuthor } = require("../helpers/authorHelper");
const HttpException = require("../utils/httpException");
const { cloudinaryUpload } = require("../helpers/upload");
const { AUTHOR_ASSETS_FOLDER_NAME } = require("../constants/constants");

    exports.checkValidation = (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new HttpException(400, "Validation failed", result.array());
        }
    };

    exports.create = async (req, res, next) => {
        try {
            this.checkValidation(req, res)
            if(req.file) {
                const uploadedResult = await cloudinaryUpload(req.file?.path, AUTHOR_ASSETS_FOLDER_NAME)
                if(uploadedResult) {
                    req.body.image = uploadedResult.secure_url
                }
            }
            const data = await createAuthor(req.body)
            res.send({
                message: data?.message
            })
        } catch (error) {
            next(error)
        }
    }
