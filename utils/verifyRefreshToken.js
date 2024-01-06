const userTokenModel = require("../models/userTokenModel");
const jwt = require("jsonwebtoken");

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    try {
        return new Promise((resolve, reject) => {
            userTokenModel.findOne({ token: refreshToken }, (err, doc) => {
                if (!doc)
                    return reject({ error: true, message: "Invalid refresh token" });
    
                jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                    if (err)
                        return reject({ error: true, message: "Invalid refresh token" });
                    resolve({
                        tokenDetails,
                        error: false,
                        message: "Valid refresh token",
                    });
                });
            });
        });
    } catch (error) {
        throw new Error('Error at veriry refresh token')
    }
};

module.exports = {
    verifyRefreshToken
}