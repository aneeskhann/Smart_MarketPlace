import { ProductsModel } from "../model/productModel.js";

// Controller function for creating a new product
const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;
    console.log(req.body);
    // Create a new product instance
    const product = new ProductsModel({
      title,
      price,
      description,
      category,
      image,
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create product", message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await ProductsModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductsModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Failed to get product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createProduct, getProducts, getProductById };
