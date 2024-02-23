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