import express from "express"
import { connection } from './db/Connection.js'
import product_router from "./routes/product_router.js" 
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import weather from './routes/weather.js'

const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/users', userRoutes)
app.use('/weather', weather)
app.use('/product', product_router)
app.use('/api/login', userRoutes);

connection.then(() => {
  console.log("Connected.")
}).catch((e) => {
  console.log(e)
})

app.listen(5000)
