import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
// ROUTES
import routerPost from './routes/post.routes.js';

dotenv.config();

const app = express();
app.use(express.static('static'))
app.use(fileUpload())
app.use(express.json());
app.use('/api/post',routerPost);




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