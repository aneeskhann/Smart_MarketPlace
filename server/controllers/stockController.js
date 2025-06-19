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


// Fetch all stock data
const getAllStock = async (req, res) => {
  
  try {
    // Fetch stock data and populate product details
    const stock = await Stock.find().populate('productId','title','category','price'); 
    console.log('Fetched Stock:', stock); // Log the fetched stock data

    // Check if stock is found
    if (!stock || stock.length === 0) {
      console.log('No stock data available'); // Log when no stock data is found
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

// Update stock quantity (increase or decrease)
const updateStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validation
    if (!productId || quantity === undefined || quantity === null) {
      return res.status(400).json({ error: "Product ID and quantity are required" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    // Check if the product exists
    const product = await productsModel.findById(productId);
    console.log('Fetched Product:', product); // Log the fetched product

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the existing stock entry for the product
    let stock = await Stock.findOne({ productId });
    if (!stock) {
      // If no stock entry exists, create one
      stock = new Stock({
        productId,
        quantity,
      });
      console.log('Stock created:', stock); // Log the created stock
    } else {
      // Update the existing stock entry
      stock.quantity += quantity; // Increase or decrease based on quantity passed
      console.log('Stock updated:', stock); // Log the updated stock
    }

    // Prevent stock from going negative (if your business rule requires this)
    if (stock.quantity < 0) {
      return res.status(400).json({ error: "Stock cannot go below zero" });
    }

    const updatedStock = await stock.save();
    console.log("Stock saved:", updatedStock); // Log the saved stock
    res.status(200).json(updatedStock);
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ error: "Failed to update stock" });
  }
};

export { updateStock, getStockByProductId, getAllStock,createStock };
