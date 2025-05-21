const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    storage: {
      type: String,
      enum: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB" ],
    },
    totalStock: Number,
    condition: {
      type: String,
      enum: ["Brand New", "Premium Used"],
      default: "Brand New",
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
