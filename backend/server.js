import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './router/auth.routes.js';
import messagesRoutes from './message/auth.routes.js';
import userRouter from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json()); //to parse the incoming request with JSON payloads(from req.body)
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/message',messagesRoutes);
app.use('/api/user',userRouter);

// app.get('/', (req, res) => {
//     res.send('Hello World');    
// });


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});