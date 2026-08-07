import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";


export async function protectRoute(req,res, next){
    
     try{

         const { userId } = getAuth(req);

         if(!userId){
            res.status(401).json({ message: "Unauthorized"});
            return;
         }

         const user = await User.findOne({clerkId: userId});

         if(!user){
            res.status(404).json({ message: "user profile is not synced yet"});
            return;
         }

         req.user = user;
         next();

     }

     catch(error){

        console.log("Error in protectRoute middleware", error);
        return res.status(500).json({message: "Internal Server Error"});
     }

}