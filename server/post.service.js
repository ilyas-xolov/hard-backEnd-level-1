import modelPost from "../models/post.model.js";
import fileService from "./file.service.js";

class PostService {
    async get(){
        return await modelPost.find();      
    }
    async getById(id){
        return await modelPost.findById(id);
    }

    async post(body,file){
        const fileName = fileService.save(file)
        return await modelPost.create({...body, file: fileName});
    }
    
    async put(id,body){
        return await modelPost.findByIdAndUpdate(id,body,{new: true});
    }
    
    async delete(id){
        return await modelPost.findByIdAndDelete(id);
    }
}
export default new PostService