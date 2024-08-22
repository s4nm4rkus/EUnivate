import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Use MONGO_URI from .env
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
