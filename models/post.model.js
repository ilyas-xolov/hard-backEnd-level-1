import {Schema,model} from "mongoose";


const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    file: {type: String, required: true}
},{timestamps:true});

const modelPost = model('Post',postSchema)

export default modelPost