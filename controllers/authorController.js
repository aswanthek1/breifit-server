const { validationResult } = require("express-validator");
const { createAuthor } = require("../helpers/authorHelper");
const HttpException = require("../utils/httpException");

    exports.checkValidation = (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new HttpException(400, "Validation failed", result.array());
        }
    };

    exports.create = async (req, res, next) => {
        try {
            console.log(req.body, "body is herere")
            this.checkValidation(req, res)
            const data = await createAuthor(req.body)
            res.send({
                message: data.message
            })
        } catch (error) {
            next(error)
        }
    }
