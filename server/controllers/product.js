import productsModel from "../model/productModel.js";

// Create a product with stock (quantity)
const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, rating, quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: "Please provide a valid quantity" });
    }

    // 🔍 Check for duplicate product based on title and category
    const existingProduct = await productsModel.findOne({
      title: title.trim(),
      category: category.trim()
    });

    if (existingProduct) {
      return res.status(409).json({ error: "Product with this title and category already exists" });
    }

    const newProduct = new productsModel({
      title,
      price,
      description,
      category,
      image: req.file, // Ensure multer is configured properly
      rating,
      quantity,
    });

    const savedProduct = await newProduct.save();
    console.log("✅ Product created successfully:", savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};


// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find();
    console.log("Fetched products:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Fetch a specific product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update product stock quantity (e.g., after a purchase)
const updateProductStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!quantity || quantity < 0) {
      return res.status(400).json({ error: "Please provide a valid quantity" });
    }

    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Decrease the quantity when a product is purchased
    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    product.quantity -= quantity;
    const updatedProduct = await product.save();

    console.log("Product stock updated:", updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product stock:", error);
    res.status(500).json({ error: "Failed to update product stock" });
  }
};

export { createProduct, getProducts, getProductById, updateProductStock };
