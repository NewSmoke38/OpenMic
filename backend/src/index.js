import mongoose from "mongoose";
import connectDB from "../config/database.js";
import dotenv from "dotenv";
import app from "./app.js"

dotenv.config({        // the .env we wanna congigure , this is a syntax so we cant do anything abt this
    path: './.env'
});

const startServer = async () => {          // it ensures that any process can take time and no further code will execute if this process hasnt completed
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
            
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(` Server is running at port :
                ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("MONGO DB connection failed !!! ", err);
        
    }
}

startServer();