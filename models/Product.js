import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }], // array of type strings (image location)
    category: { type: mongoose.Types.ObjectId, default: null, ref: "Category" }, // ref: name of the model
    properties: { type: Object },
});

const Product = models?.Product || model('Product', ProductSchema); // check if productSchema already exists

export default Product;