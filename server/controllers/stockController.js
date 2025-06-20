import Stock from '../model/stockModel.js';
import productsModel from '../model/productModel.js';

const createStock = async () => {
  try {
    const products = await productsModel.find(); // Fetch all products
    
    // Use Promise.all() to ensure async operations are handled properly
    await Promise.all(
      products.map(async (product) => {
        // Check if stock already exists for the product
        let stock = await Stock.findOne({ productId: product._id });
        
        if (!stock) {
          // If stock doesn't exist, create a new stock record
          stock = new Stock({
            productId: product._id,
            quantity: product.quantity || 0, // Use product's quantity or default to 0 if not available
          });
          
          // Save the stock record
          await stock.save();
          console.log(`Stock created for product: ${product.title}`);
        } else {
          // Optionally, if you want to update the stock quantity, do it here
          stock.quantity = product.quantity || 0;
          await stock.save();
          console.log(`Stock updated for product: ${product.title}`);
        }
      })
    );

    console.log("All stock records have been processed successfully.");
  } catch (error) {
    console.error("Error creating or updating stock:", error);
  }
};


const getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find().populate('productId', 'title price category');

    if (!stock || stock.length === 0) {
      return res.status(404).json({ error: "No stock data available" });
    }

    res.status(200).json(stock);
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
};


// Fetch stock data for a specific product by its productId
const getStockByProductId = async (req, res) => {
  try {
    const { productId } = req.params;  // productId comes from the URL params
    console.log('Fetching stock for productId:', productId); // Log the productId

    // Find stock data by productId
    const stock = await Stock.findOne({ productId }).populate('productId');
    console.log('Fetched Stock for Product:', stock); // Log the fetched stock for the specific product

    if (!stock) {
      console.log('Stock not found for this product'); // Log when no stock is found for the product
      return res.status(404).json({ error: "Stock not found for this product" });
    }
    
    res.status(200).json(stock);
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).json({ error: "Failed to fetch stock" });
  }
};

const updateStock = async (req, res) => {
  try {
    const { productId, quantity, type } = req.body;

    // Validate input
    if (!productId || quantity === undefined) {
      return res.status(400).json({ error: "Product ID and quantity are required" });
    }

    // Find the product and stock entry
    const product = await productsModel.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let stock = await Stock.findOne({ productId });
    if (!stock) {
      stock = new Stock({ productId, quantity: 0 });
    }

    // Determine update type
    if (type === "increment") {
      stock.quantity += quantity;
    } else if (type === "set") {
      stock.quantity = quantity;
    } else {
      return res.status(400).json({ error: "Invalid update type" });
    }

    // Prevent negative stock
    if (stock.quantity < 0) {
      return res.status(400).json({ error: "Stock cannot go below zero" });
    }

    const updatedStock = await stock.save();
    res.status(200).json(updatedStock);
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ error: "Failed to update stock" });
  }
};


export { updateStock, getStockByProductId, getAllStock,createStock };
