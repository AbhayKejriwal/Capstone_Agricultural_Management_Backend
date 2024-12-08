// Purpose: Connect to MongoDB using mongoose.
// Define a function named connectDB that connects to the MongoDB database named foodDelivery.
// Export the connectDB function.

import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    }catch(error){
        console.error("Error connecting to MongoDB: ", error);
    }
};