const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/eqaim-blog');
        console.log(`Mongodb connected`)
    } catch (error) {
        console.log(`error found on connecting mongodb ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB