const jwt = require('jsonwebtoken');
const userTokenModel = require('../models/userTokenModel');

const generateToken = async(user) => {
    try {
        const payload = { _id: user._id, email: user.email };
        const accessToken = jwt.sign(
            payload,
            process.env.TOKEN_PRIVATE_KEY,
            { expiresIn: "14m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.TOKEN_PRIVATE_KEY,
            { expiresIn: "14m" }
        );
        const userToken = await userTokenModel.findOne({ authorId: user._id });
        if (userToken) await userToken.remove();

        await new userTokenModel({ authorId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
}


module.exports = {
    generateToken
}