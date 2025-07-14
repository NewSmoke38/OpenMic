import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());     

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow localhost for development
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
            return callback(null, true);
        }
        
        // Allow Vercel domains
        if (origin.includes('vercel.app') || origin.includes('vercel.com')) {
            return callback(null, true);
        }
        
        // Allow your specific Vercel domain (replace with your actual domain)
        if (origin.includes('https://openmic-one.vercel.app/')) {
            return callback(null, true);
        }
        
        // For now, allow all origins in production (you can restrict this later)
        return callback(null, true);
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