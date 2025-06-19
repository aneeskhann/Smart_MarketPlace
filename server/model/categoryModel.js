  import mongoose from "mongoose";

  const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    isPredefined: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    }
  }, {
    timestamps: true
  });

  // Create indexes
  categorySchema.index({ name: 1 });
  categorySchema.index({ slug: 1 });

  const categoryModel = mongoose.model("categories", categorySchema);

  // Initialize predefined categories
  const initializePredefinedCategories = async () => {
    const predefinedCategories = [
      {
        name: "Electronics",
        description: "Electronic devices, gadgets, and accessories",
        slug: "electronics",
        isPredefined: true
      },
      {
        name: "Clothing",
        description: "Apparel, fashion items, and accessories",
        slug: "clothing",
        isPredefined: true
      },
      {
        name: "Home & Kitchen",
        description: "Home appliances, kitchenware, and furniture",
        slug: "home-kitchen",
        isPredefined: true
      },
      {
        name: "Beauty & Personal Care",
        description: "Beauty products, skincare, and personal care items",
        slug: "beauty-personal-care",
        isPredefined: true
      },
      {
        name: "Sports & Outdoors",
        description: "Sports equipment, outdoor gear, and fitness items",
        slug: "sports-outdoors",
        isPredefined: true
      },
      {
        name: "Books & Stationery",
        description: "Books, notebooks, and office supplies",
        slug: "books-stationery",
        isPredefined: true
      },
      {
        name: "Toys & Games",
        description: "Toys, games, and entertainment items",
        slug: "toys-games",
        isPredefined: true
      },
      {
        name: "Health & Wellness",
        description: "Health supplements, wellness products, and medical supplies",
        slug: "health-wellness",
        isPredefined: true
      },
      {
        name: "Automotive",
        description: "Auto parts, accessories, and maintenance items",
        slug: "automotive",
        isPredefined: true
      },
      {
        name: "Jewelry & Watches",
        description: "Fine jewelry, fashion jewelry, and timepieces",
        slug: "jewelry-watches",
        isPredefined: true
      }
    ];

    try {
      for (const category of predefinedCategories) {
        await categoryModel.findOneAndUpdate(
          { slug: category.slug },
          category,
          { upsert: true, new: true }
        );
      }
      console.log("✅ Predefined categories initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing predefined categories:", error);
    }
  };

  // Call initialization
  initializePredefinedCategories();

  export default categoryModel; 