import mongoose from 'mongoose'

// Define the schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number},
    count: { type: Number},
  },
});

// Create the model
const Product = mongoose.model('Product', productSchema);

export {Product}
