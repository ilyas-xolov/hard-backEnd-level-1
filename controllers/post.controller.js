import modelPost from "../models/post.model.js";
import postService from "../server/post.service.js";
import apiMsg from "../utils/api.message.util.js";
class PostController {

    // ------------------------------ GET ALL ------------------------------ //
    async get(req,res){
        try {
            const list = await postService.get()    
            res.status(200).json(apiMsg.success(list))
        } catch (error) {
            res.status(500).json(apiMsg.internalServer(error.errors))
        }
    }
    // ------------------------------ GET ELEMENT BY ID ------------------------------ //
    async getById(req,res){
        const id = req.params.id;
        if(!id){
            res.status(400).json(apiMsg.badRequest('invalid.param.id'))
            return
        }

        try {
            const item = await postService.getById(id);
            if(!item)
                res.status(400).json(apiMsg.badRequest('invalid.param.not-found.id'))
            else
                res.status(200).json(apiMsg.success(item));
        } catch (error) {
            res.status(500).json(apiMsg.internalServer(error));
        }
    }
    // ------------------------------ POST ------------------------------ //
    async post(req,res){
        const {title,body} = req.body
    
        if(!title || !body){
            res.status(400).json(apiMsg.badRequest("invalid.params: title, body, file")); 
            return
        }
    
        try {
            const newPost = await postService.post(req.body,req.files.file);
            console.log(req.files.file);
            res.status(200).json(apiMsg.success(newPost));
        } catch (error) {
            res.status(500).json(apiMsg.internalServer(error.errors));
        }
    }
    // ------------------------------ PUT ------------------------------ //
    async put(req,res){
        const id = req.params.id ?? null;
        const {title,body} = req.body;
        if(!id){
            res.status(400).json(apiMsg.badRequest("invalid.param.id")); 
            return
        }
        if(!title || !body){
            res.status(400).json(apiMsg.badRequest("invalid.body: title, body",req.body)); 
            return
        }
        try {
            const changed = await postService.put(id,req.body);
            if(!changed){
                res.status(400).json(apiMsg.badRequest("invalid.param.id")); 
                return
            }else{
                await res.status(200).json(apiMsg.success(changed));
            }
        } catch (error) {
            res.status(500).json(apiMsg.internalServer(error.errors));
        }
    }
    // ------------------------------ DELETE ------------------------------ //
    async delete(req,res){
        const id = req.params.id ?? null;
        if(!id){
            res.status(400).json(apiMsg.badRequest("invalid.param.id")); 
        }

        try {
            const deleted = await postService.delete(id)
            if(!deleted)
                res.status(400).json(apiMsg.badRequest('invalid.param.id'));
            else
                res.status(200).json(apiMsg.success(deleted));
        } catch (error) {
            res.status(500).json(apiMsg.internalServer(error.errors));
        }
    }
}

export default new PostController