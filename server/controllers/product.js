import productsModel from "../model/productModel.js";


const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, rating } = req.body;

    console.log(req.body);

    const newProduct = new productsModel({
      title,
      price,
      description,
      category,
      image: req.file,
      rating,
    });
    const savedProduct = await newProduct.save();

    console.log("Product created successfully");
    console.log("Saved product:", savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const product = await productsModel.find(); // Fetch all products

    const items = product.map((product) => ({
      ...product.toObject(), // Convert to plain JS object
      image: `http://localhost:8000/${product.image}`, // Construct image URL
    }));

    console.log("Fetching all products");
    res.status(200).json(items); // Send products as JSON response
  } catch (error) {

    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};




const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsModel.findById(productId);

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
