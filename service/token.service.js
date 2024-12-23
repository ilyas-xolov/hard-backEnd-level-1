import jwt from 'jsonwebtoken';
import modelToken from "../models/token.model.js";



class TokenService {
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: "15m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: "30d"});

        return { accessToken, refreshToken };
    }

    async saveToken(userId, refreshToken){
        const existToken = await modelToken.findOne({ user: userId });
        
        if(existToken){
            existToken.refreshToken = refreshToken;
            return await existToken.save();
        }

        const token = await modelToken.create({ user:userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken){
        return modelToken.findOneAndDelete({ refreshToken })
    }

    async findToken(refreshToken){
        return await modelToken.findOne({ refreshToken })
    }

    validateRefreshToken(token){
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY);
        } catch (error) {
            return null
        }
    }

    validateAccessToken(token){
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY);
        } catch (error) {
            return null
        }
    }
}

export default new TokenService()