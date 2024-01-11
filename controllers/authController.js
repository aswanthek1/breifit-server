const { verifyRefreshToken } = require("../utils/verifyRefreshToken")

exports.authenticateUser = async(req, res, next) => {
    try {
        console.log(req.headers.authorization, 'req.headers?.Authorization')
        const data = await verifyRefreshToken(req.headers?.authorization);
        console.log(data, "data")
        let status = 200
        if(data?.error) {
            status = 400
        }
        res.status(status).json({error:data.error, message:data.message})
    } catch (error) {
        console.log(error)
        next(error)
    }
}