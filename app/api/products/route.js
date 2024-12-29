import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await initMongoose();

    // Get product by ID for editing from Req
    const symbols = Object.getOwnPropertySymbols(req);
    const state = req[symbols[1]];
    const searchParams = state.url.searchParams;
    const id = searchParams.get('id');

    if (id) {
        const product = await Product.findOne({ _id: id });
        return NextResponse.json(product);
    }
    // Get all products
    const products = await Product.find();
    // console.log(products);
    return NextResponse.json(products);
};

export const POST = async (req) => {
    await initMongoose();

    const body = await req.json(); // Parse request body
    const product = await Product.create(body); // Add product to DB

    return NextResponse.json(product);
};

export const PUT = async (req) => {
    await initMongoose();

    const body = await req.json();
    const { title, description, price, _id, images, category, productProperties } = body;
    console.log("console: ", body);

    await Product.updateOne({ _id }, {
        title, description, price, images, category,
        properties: productProperties
    }); // id (search) must be an object

    return NextResponse.json({ msg: "Updated successfully." });

}
export const DELETE = async (req) => {
    await initMongoose();

    const body = await req.json();
    const { _id } = body;
    if (_id) await Product.deleteOne({ _id });

    return NextResponse.json({ msg: "Deleted successfully." });
}
//  or
// const handle
// export { handle as GET, handle as POST };