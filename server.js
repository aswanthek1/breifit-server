const express = require('express')
const logger = require('morgan')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv  = require('dotenv').config
const port = process.env.PORT || 4000
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/blog', require('./routes/blogRoutes'))

connectDB()
app.listen(port, () => {
    try {
        console.log(`server running at port ${port}`)
    } catch (error) {
        console.log(`error found ${error}`)
    }
})