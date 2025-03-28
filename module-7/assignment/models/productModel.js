import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: { type: Number, required: true, unique: true },
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 }, 
    createdAt: { type: Date, default: Date.now } 
});

export const Product = mongoose.model("ass_7Product", productSchema);
