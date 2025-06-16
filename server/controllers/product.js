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
    const products = await productsModel.find();
    console.log("Fetching all products:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};




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

export { createProduct, getProducts, getProductById };
