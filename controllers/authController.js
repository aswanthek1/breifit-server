const { verifyRefreshToken, checkAccessToken } = require("../utils/verifyToken")

exports.authenticateUser = async(req, res, next) => {
    try {
        console.log(req.headers.authorization, 'req.headers?.Authorization')
        console.log(req.cookie, "coooookiiieee")
        const data = await checkAccessToken(req, res, next);
        console.log(data, "data")
        // console.log(req.user, "req.user at contorller")
        let status = 200
        if(data?.error) {
            status = 400
        }
        if(data?.accessToken) {
            // it means new token is generated
            console.log('insidei of access')
            res.cookie('token', data?.accessToken, {httpOnly:false})
        }
        res.status(status).json({error:data?.error, message:data?.message, status:data?.status, accessToken:data?.accessToken})
    } catch (error) {
        console.log(error)
        next(error)
    }
}