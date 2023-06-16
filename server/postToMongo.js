import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
import {products} from './model/products.js'

dotenv.config()

const apiKey = process.env.MONGODB_CONNECTION_STRING;

const url = apiKey; // Replace with your MongoDB connection URL
const dbName = 'test'; // Replace with your database name

const postToMongoDB = async (dataArray) => {
  const client = new MongoClient(url);

  try {
    await client.connect(); // Connect to the MongoDB server

    const db = client.db(dbName); // Get the database instance

    const collection =db.collection('products'); // Replace 'your_collection_name' with the actual collection name

    await collection.insertMany(dataArray); // Insert the array of data into the collection

    console.log('Data posted to MongoDB successfully!');
  } catch (error) {
    console.error('Error posting data to MongoDB:', error);
  } finally {
    client.close(); // Close the MongoDB connection
  }
};

// Usage: Call the function with the entire array
const dataArrayToPost = products; // Replace 'arrayFromAPI' with the actual name of the array from your API

postToMongoDB(dataArrayToPost);
