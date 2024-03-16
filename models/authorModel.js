const mongoose = require("mongoose");


const authorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        proffession: {
            type: String,
            required: false,
            default: null
        },
        company_name: {
            type: String,
            required: false,
            default: null
        },
        image: {
            type: String,
            required: false,
            default: null
        },
        password: {
            type:String,
            required:true,
        },
        role: {
            type: String,
            enum: ['basic', 'admin'],
            required: true,
            default: 'basic'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('authors', authorSchema)