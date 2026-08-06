import express from 'express';
import 'dotenv/config';
import mognoose from 'mongoose';
import mongoose from 'mongoose';


const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL)

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT)
});

