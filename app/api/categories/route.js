import { initMongoose } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Category from "@/models/Category";
import { checkAdmin } from "../auth/[...nextauth]/route";

export const GET = async () => {
    await initMongoose();
    // await checkAdmin(req,res); // not working

    // const body = await req.json();
    // console.log(body);
    const categories = await Category.find().populate('parent');
    // console.log(categories);
    return NextResponse.json({ categories, success: true, });
}

export const POST = async (req) => {
    await initMongoose();

    const { category, parentCategory, properties } = await req.json();; // body
    // console.log({ category, parentCategory, properties });

    const categoryDoc = await Category.create({
        name: category,
        parent: parentCategory || null, // to avoid validation error
        properties,
    });
    // console.log("result", categoryDoc);
    return NextResponse.json({ success: true, categoryDoc });
}

export const PUT = async (req) => {
    await initMongoose();

    const { _id, category, parentCategory, properties } = await req.json(); // body
    // console.log("PUT method: ", { _id, category, parentCategory });

    const result = await Category.updateOne({ _id }, {
        name: category,
        parent: parentCategory,
        properties,
    });
    // console.log("result", result);

    return NextResponse.json({ success: true });
}
export const DELETE = async (req) => {
    await initMongoose();

    const { _id } = await req.json();; // body: id is directly sent from front end
    // console.log("DELETE method: ", _id);
    await Category.deleteOne({ _id });

    return NextResponse.json({ msg: "Deleted successfully." });

}

