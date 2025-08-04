import mongoose from 'mongoose';

export const connectDB = async () => {

    try{
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB connected Successfully: ${conn.connection.host}`);
    }
    catch(error){
     console.log("Error in Connecting to the Database", error);
    }
}