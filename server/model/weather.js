import mongoose from "mongoose";


const weatherSchema= mongoose.Schema({
  temperature:String,
  humidity:String
})

const weatherModel=mongoose.model('weather',weatherSchema);

export {weatherModel}