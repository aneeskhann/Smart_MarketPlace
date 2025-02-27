import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config({
  path: './.env'
});

// console.log(process.env.MONGODB_URL); // Should print the MongoDB URL from .env

const apiKey = "mongodb+srv://anees:anees7342@atlascluster.cq5fc6p.mongodb.net/";

const connection = async () => {
  try {
    await mongoose.connect(apiKey , {
      dbName: "SMART"
    });
    console.log("Connected on PORT:", process.env.PORT | 8000);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

// Call the testConnection function to initiate the connection
connection();
export { connection };


