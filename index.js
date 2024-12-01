import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

// MIDDLEWARE
import requestTime from './middlewares/request-time.js';

// ROUTES
import routerPost from './routes/post.route.js';
import routerUser from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(requestTime);
app.use(express.static('static'))
app.use(fileUpload())
app.use(express.json());

// ROUTES
app.use('/api/post',routerPost);
app.use('/api/auth',routerUser);



// SERVICE CONNECTING...
const PORT = process.env.PORT || 7070;
const mongo_DB = process.env.mongo_DB
const rootService = async ()=>{
    if(!mongo_DB) throw new Error('MongoDB path not found!\nPlease check env.mongo_DB');
    try {
        app.listen(PORT,()=> console.log(`Listening on - http://localhost:${PORT}`))
        await mongoose.connect(mongo_DB).then(()=> console.log('Connection successfully with MongoDB'))
    } catch (error) {
        console.log("ERROR connecting with mongoDB:",error);
    }
}

rootService();