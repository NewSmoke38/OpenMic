import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());     // w/o it req.body will stay undefined and no json reqs will be entertained

// cors config - simplified and more permissive
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
            return callback(null, true);
        }
        
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// routes import
import userRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'

// routes declaration
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/messages", messageRouter);


// http://localhost:8000/api/v1/users/register


export default app;