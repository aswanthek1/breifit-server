const { checkAccessToken } = require("../utils/verifyToken")

exports.authenticate = async(req, res, next) => {
    try {
        console.log('on authenicate middleware')
        const data = await checkAccessToken(req, res, next)
        console.log(data, 'data of authenicate', req.user)
        if(!data?.error && data?.status === 200) {
            next()
        }
        else {
            return res.status(400).json({message: 'User not found'})
        }
    } catch (error) {
        // next()
    }
}

exports.checkAdmin = (req, res, next) => {
    try {
        console.log(req.user, 'user at checkadmin')
        if(req.user?.role === 'admin') {
            next()
        }
        else {
            return res.status(401).json({message: 'You are not authorized'})
        }
    } catch (error) {
        console.log(error, 'error at checkadmin')
    }
}