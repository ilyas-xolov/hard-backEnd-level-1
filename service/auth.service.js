import UserDto from '../dtos/user.dto.js';
import modelUser from './../models/user.model.js';
import bcrypt from 'bcrypt';
import TokenService from './token.service.js'
import mailService from './mail.service.js';
import userModel from './../models/user.model.js';
import tokenService from './token.service.js';


class AuthService {
    async register(email,password){
        const existUser = await modelUser.findOne({ email });

        if(existUser){
            throw new Error(`With email "${email}" already registered`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await modelUser.create({ email, password:hashPassword })
        const userDTO = new UserDto(user);
        const tokens = TokenService.generateToken({...userDTO});
        await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDTO.id}`);

        await TokenService.saveToken(user._id, tokens.refreshToken);
        return { user: userDTO, ...tokens }  
    }

    async activation(userId){
        const user = await modelUser.findById(userId);
        if(!user) throw new Error('User not found');

        user.isActivated = true;
        await user.save();
    }

    async login(email, password){
        
        const user = await userModel.findOne({ email });
        console.log(user);
        if(!user) throw new Error("invalid.email.or.password");

        const passCorrect = await bcrypt.compare(password,user.password)        
        if(!passCorrect) throw new Error("invalid.email.or.password");

        const userDTO = new UserDto(user);
        const tokens = tokenService.generateToken({...userDTO});
        
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);
        return { user: userDTO, ...tokens };
    }

    async logout(refreshToken){
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw new Error('Bad authorization');
        }

        const userPayload = tokenService.validateRefreshToken(refreshToken);
        const tokenDB = await tokenService.findToken(refreshToken);

        if(!userPayload || !tokenDB){
            throw new Error('Bad authorization');
        }
        
        const user = await userModel.findById(userPayload.id);
        const userDTO = new UserDto(user);

        const tokens = tokenService.generateToken({...userDTO});
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);
        return { user: userDTO, ...tokens};
    }
}

export default new AuthService();