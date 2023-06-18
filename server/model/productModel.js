import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String
    
  }
});

// Create the product model
const ProductsModel = mongoose.model('Product', productSchema);

export  {ProductsModel}
