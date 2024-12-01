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
            res.json(apiMsg.success({userActivated:true}));
        } catch (error) {
            res.status(500).json(apiMsg.internalServer(error.message))
        }
    }
}

export default new AuthController;