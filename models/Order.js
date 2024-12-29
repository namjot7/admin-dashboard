import { model, models, Schema } from "mongoose"

const orderSchema = new Schema({
    products: Object, // line_items
    username: String,
    email: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    paid: Boolean,// { type: Boolean, defaultValue: false },
}, { timestamps: true });

const Order = models?.Order || model("Order", orderSchema);

export default Order;