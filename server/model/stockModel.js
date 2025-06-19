import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',  // Refers to the 'products' collection
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,  // Initial stock set to 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Stock = mongoose.model('stock', stockSchema);

export default Stock;
