import UserDto from '../dtos/user.dto.js';
import modelUser from './../models/user.model.js';
import bcrypt from 'bcrypt';
import TokenService from './token.service.js'


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

        await TokenService.saveToken(userDTO.id, tokens.refreshToken);
        return { user: userDTO, ...tokens }  
    }

    async activation(userId){
        const user = await modelUser.findById(userId);

        if(!user) throw new Error('User not found');

        user.isActivated = true;
        await user.save();
    }
}

export default new AuthService();