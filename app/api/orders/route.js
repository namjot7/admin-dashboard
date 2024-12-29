import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export const GET = async () => {
    await initMongoose();
    const orders = await Order.find().sort({ createdAt: - 1 });
    return NextResponse.json(orders);
}