import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import cors from 'cors';
import { register } from './controllers/auth.js';

const app = express();

mongoose.connect(process.env.DATABASE).then(()=>console.log("Database Connected successfully")).catch(()=>console.log("Failed!"))

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api', register)


const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log("Server IS Running on Port "+port))