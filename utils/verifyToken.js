const userTokenModel = require("../models/userTokenModel");
const jwt = require("jsonwebtoken");
const privateKey = process.env.TOKEN_PRIVATE_KEY;
const mongoose = require("mongoose");
const { ACCESS_TOKEN_EXPIRY } = require("../constants/constants");

const verifyRefreshToken = async (accessToken) => {

    try {

        if (!accessToken) {
            return { error: true, message: "Invalid refresh token1", status: 400 }
        }
        console.log(accessToken, "at refres")
        const decodedAccess = jwt.decode(accessToken);
        console.log(decodedAccess._id, 'decoded access at refres')

        const authorId = mongoose.Types.ObjectId(decodedAccess._id)

        // now find refresh token from db and check validity. If valid create a new access token and save in frontent

        const tokenModelData = await userTokenModel.findOne({authorId}).populate('authorId')

        console.log(tokenModelData, "tokenmodel datatata");
        
        if(!tokenModelData) {
            return {
                error: true,
                message: "Invalid refresh token",
                status: 400
            }
        }
        
        const refreshToken = tokenModelData?.token;
        return await jwt.verify(refreshToken, privateKey, async (err, decoded) => {
            if (err) {
                console.log(err, "error refressssssssssss")
                return {
                    error: true,
                    message: "Invalid refresh token",
                    status: 400
                }
            }
            console.log(decoded, "decoded at access")
            if (decoded) {
                // generate new access token
                const payload = { _id: tokenModelData?.authorId?._id, email: tokenModelData?.authorId?.email };
                const accessToken = jwt.sign(
                    payload,
                    privateKey,
                    { expiresIn: ACCESS_TOKEN_EXPIRY }
                );
                return {
                    accessToken,
                    payload:payload,
                    error: false,
                    message: "Generated new access token",
                    status: 200,
                }
            }
        })


        // return new Promise((resolve, reject) => {
        //     userTokenModel.findOne({ token: accessToken }, (err, doc) => {
        //         if ( err || !doc)
        //             return reject({ error: true, message: "Invalid refresh token1" ,status:400});

        //         jwt.verify(accessToken, privateKey, (err, tokenDetails) => {
        //             if (err)
        //                 return reject({ error: true, message: "Invalid refresh token2", status:400 });

        //             resolve({
        //                 tokenDetails,
        //                 error: false,
        //                 message: "Valid refresh token",
        //                 status:200
        //             });
        //         });
        //     });
        // });


    } catch (error) {
        console.log(error, "")
        throw new Error('Error at veriry refresh token'+error)
    }
};


const checkAccessToken = async (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization;
        if (!accessToken || accessToken == 'undefined') {
            return { error: true, message: "Invalid access token1", status: 400 }
        }
        return await jwt.verify(accessToken, privateKey, async (err, decoded) => {
            if (err) {
                ///if not decode then use refresh token to create new access token.
                const createNewAccess = await verifyRefreshToken(accessToken)
                console.log(createNewAccess, "createNewAccess")
                if(!createNewAccess.error && createNewAccess.status === 200 && createNewAccess.payload) {
                    req.user = createNewAccess.payload;
                    delete createNewAccess.payload;
                }
                return createNewAccess
            }
            console.log(decoded, "decoded at access")
            if (decoded) {
                req.user = decoded
                return {
                    decoded,
                    error: false,
                    message: "Valid refresh token",
                    status: 200
                }
                // next()
            }
        })


    } catch (error) {
        console.log(error, 'in check access error')
    }
}

module.exports = {
    verifyRefreshToken,
    checkAccessToken
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