import express from 'express'
import mongoose from 'mongoose';
import modelPost from './models/post.model.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const timestamp = new Date().toISOString();

app.use(express.json())

app.get('/', async (req,res)=>{
    try {
        const post = await modelPost.find();      
            res.status(200).json({
            status: 200,
            message: null,
            data: post,
            timestamp
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.errors,
            timestamp
        })
    }
})

app.post('/', async (req,res)=>{
    const {title,body} = req.body

    if(!title || !body){
        res.status(400).json({
            status: 400,
            message: "invalid.params: title, body",
            data: null,
            timestamp
        }) 
        return
    }

    try {
        const newPost = await modelPost.create({title,body});
        res.status(200).json({
            status: 200,
            message: null,
            data: newPost,
            timestamp
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.errors,
            timestamp
        })
    }
})





const PORT = process.env.PORT || 7070;
const mongo_DB = process.env.mongo_DB
const root = async ()=>{
    try {
        app.listen(PORT,()=> console.log(`Listening on - http://localhost:${PORT}`))
        await mongoose.connect(mongo_DB).then(()=> console.log('Connection successfully with MongoDB'))
    } catch (error) {
        console.log("ERROR connecting with mongoDB:",error.errmsg);
    }
}

root();