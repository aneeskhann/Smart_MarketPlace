import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { connection } from './db/Connection.js'
import product_router from "./routes/product_router.js" 
import userRoutes from './routes/userRoutes.js'
import morgan from 'morgan'



const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))



connection.then(() => {
  console.log("Connected.")
}).catch((e) => {
  console.log(e)
})
app.use('/product', product_router);
app.use('/api/users', userRoutes)
app.use('/api/login', userRoutes);
app.get('/',(req,res)=>{
  res.json({message:"Welcome to server"})
})
app.listen(5000)
