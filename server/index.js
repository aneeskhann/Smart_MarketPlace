import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import { connection } from './db/Connection.js'
import product_router from "./routes/product_router.js" 
import userRoutes from './routes/userRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import morgan from 'morgan'



const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'))



connection.then(() => {
  console.log("Connected.")
}).catch((e) => {
  console.log(e)
})
app.use('/product', product_router)
app.use('/api', userRoutes)
app.get('/',(req,res)=>{
  res.json({message:"Welcome to server"})
})
app.get("/payments", paymentRoutes)
app.listen(5000)
