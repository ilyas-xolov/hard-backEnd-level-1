import authService from "../service/auth.service.js";
import apiMsg from "../utils/api.message.util.js"

class AuthController {
    
    async register(req,res,next){
        try {
            const {email,password} = req.body;
            const data = await authService.register(email,password);  

            res.cookie("refreshToken", data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.status(200).json(apiMsg.success(data));
        } catch (error) {
            return res.status(500).json(apiMsg.internalServer(error.message));
        }
    }
    
    async activation(req,res,next){
        const userId = req.params.id;
        try {
            await authService.activation(userId);
            return res.redirect('https://youtube.com');
        } catch (error) {
            return res.status(500).json(apiMsg.internalServer(error.message))
        }
    }

    async login(req,res,next){

        try {
            
            const {email, password} = req.body;
            const data = await authService.login(email,password);

            res.cookie("refreshToken", data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.json(apiMsg.success(data));
        } catch (error) {
            return res.status(500).json(apiMsg.internalServer(error.message))
        }
    }

    async logout(req,res,next){
        try {
            const { refreshToken } = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken')  
            res.json(apiMsg.success('You have left our project and all data has been deleted.'))
        } catch (error) {
            res.status(500).json(apiMsg(error.message))
        }        
    }

    async refresh(req,res,next){

        try {
        
            const { refreshToken } = req.cookies;
            const data = await authService.refresh(refreshToken);

            res.cookie("refreshToken", data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            res.json(apiMsg.success(data));
       
        } catch (error) {
            res.status(500).json(apiMsg(error.message))
        }
    }
}

export default new AuthController();