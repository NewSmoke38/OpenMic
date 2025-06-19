import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());     // w/o it req.body will stay undefined and no json reqs will be entertained

// cors config
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true
}))


// routes import
import userRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'

// routes declaration
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/messages", messageRouter);


// http://localhost:8000/api/v1/users/register


export default app;