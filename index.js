import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoutes.js';
const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use("/api/user", route);