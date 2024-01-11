const userTokenModel = require("../models/userTokenModel");
const jwt = require("jsonwebtoken");

const verifyRefreshToken = async(accessToken) => {
    const privateKey = process.env.TOKEN_PRIVATE_KEY;

    try {
        return new Promise((resolve, reject) => {
            userTokenModel.findOne({ token: accessToken }, (err, doc) => {
                if ( err || !doc)
                    return reject({ error: true, message: "Invalid refresh token1" });
    
                jwt.verify(accessToken, privateKey, (err, tokenDetails) => {
                    if (err)
                        return reject({ error: true, message: "Invalid refresh token2" });
                    resolve({
                        tokenDetails,
                        error: false,
                        message: "Valid refresh token",
                    });
                });
            });
        });
        // await jwt.verify(accessToken, privateKey, (err, tokenDetails) => {
        //     console.log(tokenDetails, "validAccesstoken")
        //     if(err) {
                
        //     }
        //     if(tokenDetails) {
        //         return {
        //             tokenDetails,
        //             error: false,
        //             message: "Valid refresh token",
        //         }
        //     }
        // })
        
    } catch (error) {
        throw new Error('Error at veriry refresh token')
    }
};

module.exports = {
    verifyRefreshToken
}

// {
//     "_id": "659905aea4b05764e6114115",
//     "email": "aswanthek1@gmail.com",
//     "iat": 1704978441,
//     "exp": 1704979281
//   }

//   {
//     "_id": "659905aea4b05764e6114115",
//     "email": "aswanthek1@gmail.com",
//     "iat": 1704978441,
//     "exp": 1707570441
//   }