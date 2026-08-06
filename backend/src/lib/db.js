import mongoose from "mongoose";

async function connectDB (){

     try{

         const DATABASE_URL = process.env.DATABASE_URL;

         if(!DATABASE_URL){
            
            throw new Error("Database Url is Missing");
         }

        const conn = await mongoose.connect(DATABASE_URL);
        console.log("DATABASE connected Successfully", conn.connection.host);
     }

     catch(error){

         console.error("MongoDB connection error:", error.message);
         process.exit(1);
     }
}

export default connectDB;