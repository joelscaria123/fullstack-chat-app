import express from 'express';
import 'dotenv/config';
import connectDB from './lib/db.js';
import { clerkMiddleware } from "@clerk/express";


const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL

app.use(express.json());

app.use(cors({origin:FRONTEND_URL, credentials: true}));

app.use(clerkMiddleware());

app.get("/health", (req,res) => {

    res.status(200).json({message: "Hello Joel"})
})

app.listen(PORT, () => {
    
    connectDB();
    console.log("Server running on PORT", PORT)
});

