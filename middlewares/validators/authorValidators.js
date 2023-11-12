const { body } = require("express-validator")
console.log('in middddd')
exports.createAuthorSchema = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Must be at least 2 chars long')
        .isLength({ max: 100 })
        .withMessage('Must contain max 100 characters'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail({ gmail_remove_dots: false }),
    body('proffession')
        .optional()
        .isLength({ min: 2 })
        .withMessage('Must be at least 2 chars long')
        .isLength({ max: 100 })
        .withMessage('Must contain max 100 characters'),
    body('company_name')
        .optional()
        .isLength({ min: 2 })
        .withMessage('Must be at least 2 chars long')
        .isLength({ max: 100 })
        .withMessage('Must contain max 100 characters'),
]