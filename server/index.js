import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { connection } from './db/Connection.js'
import product_router from "./routes/product_router.js" 
import userRoutes from './routes/userRoutes.js'

import morgan from 'morgan'
import dotenv from 'dotenv';


dotenv.config({
  path: './.env'
})


const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'))

// console.log(process.env.MONGODB_URL); // Should print the MongoDB URL from .env


 

connection()
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
const PORT = process.env.PORT | 8000
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});


app.use('/product', product_router)
app.use('/api', userRoutes)
app.get('/',(req,res)=>{
  res.json({message:"Welcome to server"})
})

app.get('/api/userRoutes/login',(re1,res)=>{
  res.json({data})
})