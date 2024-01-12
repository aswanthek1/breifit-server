const express = require('express')
const logger = require('morgan')
const connectDB = require('./config/db')
const dotenv  = require('dotenv').config()
const multer = require("multer");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express()
const port = process.env.PORT || 4000
const HttpException = require('./utils/httpException')
const errorHandler = require('./middlewares/error.middleware')

app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5002"],
    credentials: true,
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const apiRoutes = require("./routes/index");
app.use("/api/v1", apiRoutes);

// 404 error
app.all("*", (req, res, next) => {
    const err = new HttpException(404, "Endpoint Not Found");
    res.status(err.status).send(err.message);
  });

app.use(errorHandler)

connectDB()
app.listen(port, () => {
    try {
        console.log(`server running at port ${port}`)
    } catch (error) {
        console.log(`error found ${error}`)
    }
})