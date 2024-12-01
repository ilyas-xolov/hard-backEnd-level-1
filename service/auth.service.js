import UserDto from '../dtos/user.dto.js';
import modelUser from './../models/user.model.js';
import bcrypt from 'bcrypt';
class AuthService {
    async register(email,password){
        const existUser = await modelUser.findOne({ email });
        console.log(existUser);

        if(existUser){
            throw new Error(`With email "${email}" already registered`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await modelUser.create({ email, password:hashPassword })
        
         
        const userDTO = new UserDto(user);
        return { userDTO } 
    }

    async activation(userId){
        const user = await modelUser.findById(userId);

        if(!user) throw new Error('User not found');

        user.isActivated = true;
        await user.save();
    }
}

export default new AuthService;