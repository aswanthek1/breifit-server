const { body } = require("express-validator");

exports.createBlogSchema = [
    body('content')
        .exists()
        .withMessage('Content is required')
        .isLength({ min: '10' })
        .withMessage('Must need minimum 10 chars'),
    body('tittle')
        .exists()
        .withMessage("Title is required")
        .isLength({ min: '3', max: '30' })
        .withMessage('Title must need minimum 3 and can have maximum characters of 30')
]