import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    get: function(value) {
      if (!value) return value;
      if (value.startsWith('http')) return value;
      return `http://localhost:8000/${value}`;
    }
  },
  rating: {
    rate: Number,
    count: Number
  },
  validationResult: {
    type: String,
    default: "Pending" 
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

const productsModel = mongoose.model("products", productSchema);

export default productsModel;