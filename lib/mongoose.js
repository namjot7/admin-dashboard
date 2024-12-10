import mongoose from "mongoose";

export function initMongoose() {
    if (mongoose.connection.readyState == 1) { // already connected
        return mongoose.connection.asPromise();
    }
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
}