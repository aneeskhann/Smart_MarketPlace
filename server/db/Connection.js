import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.MONGODB_CONNECTION_STRING;

const connection= mongoose.connect(apiKey, {useUnifiedTopology: true, useNewUrlParser: true})


export {connection}