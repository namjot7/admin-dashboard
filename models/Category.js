import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, default: null, ref: "Category" },
    properties: [{ type: Object }],
})
const Category = models?.Category || model("Category", CategorySchema); // check if categorySchema already exists

export default Category;