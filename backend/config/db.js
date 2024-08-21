import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = 'mongodb://127.0.0.1:27017/Eunivate'; // Hard-coded MongoDB URI
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
