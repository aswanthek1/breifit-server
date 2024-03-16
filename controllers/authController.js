const { findAuthorByCred } = require("../helpers/authorHelper");
const { verifyRefreshToken, checkAccessToken } = require("../utils/verifyToken")

exports.authenticateUser = async(req, res, next) => {
    try {
        console.log(req.headers.authorization, 'req.headers?.Authorization')
        const data = await checkAccessToken(req, res, next, true);//true is to check if it is calling from authcontroller
        console.log(data, "data")
        let status = 200
        if(data?.error) {
            status = 400
        }
        if(data?.accessToken) {
            // it means new token is generated
            // console.log('insidei of access')
            // res.cookie('token', data?.accessToken, {httpOnly:false})
        }
        let authorData;
        if(req.user?._id) {
            authorData = await findAuthorByCred(req.user)
        }
        res.status(status).json({error:data?.error, message:data?.message, status:data?.status, accessToken:data?.accessToken, authorData})
    } catch (error) {
        next(error)
    }
}