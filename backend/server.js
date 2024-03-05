import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
// import { app, server } from "./socket/socket.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json()); //to parse the incoming request with JSON payloads(from req.body)
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/users',userRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World');    
// });


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});