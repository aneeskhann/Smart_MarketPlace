import productsModel from "../model/productModel.js";

// Controller function for creating a new product
const createProduct = async (req, res) => {
  try {
    const { title, price, description, category } = req.body;

    const newProduct = new productsModel({
      title,
      price,
      description,
      category,
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

export { createProduct };
