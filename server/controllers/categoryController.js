import categoryModel from "../model/categoryModel.js";
import productsModel from "../model/productModel.js";

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Create a new custom category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Create slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    // Check if category already exists
    const existingCategory = await categoryModel.findOne({ 
      $or: [{ name }, { slug }] 
    });
    
    if (existingCategory) {
      return res.status(400).json({ 
        error: "Category with this name or slug already exists" 
      });
    }

    const newCategory = new categoryModel({
      name,
      description,
      slug,
      isPredefined: false
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    // Find category by slug
    const categoryDoc = await categoryModel.findOne({ 
      slug: category.toLowerCase() 
    });
    
    if (!categoryDoc) {
      return res.status(404).json({ error: "Category not found" });
    }

    const products = await productsModel.find({ category: categoryDoc.name });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
}; 