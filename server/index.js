import express from "express"
import { connection } from './db/Connection.js'
import product_router from "./routes/product_router.js" 
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'


const app = express()
app.use(cors())
app.use(express.json())

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
