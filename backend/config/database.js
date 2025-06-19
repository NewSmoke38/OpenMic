import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGO_URI}`)
        console.log(`\nMongoDB connected yayyy!!
            ${connectionInstance.connection.host}`);    // this gives the link/host of the db where our cluster is
        
    } catch (error) {
        console.log("MONGODB connection failed", error);
        process.exit(1)      /// shuts down the process
        
    }
}

export default connectDB;