const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected`)
    } catch (error) {
        console.log(`error found on connecting mongodb ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB