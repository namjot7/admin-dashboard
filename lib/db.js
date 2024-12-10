// import { MongoClient, ServerApiVersion } from "mongodb";

// const MongoUrl = process.env.MONGO

// // Ensure the environment variable is present
// if (!MongoUrl) {
//     throw new Error('Invalid/Missing environment variable: "MONGODB_URL"');
// }

// const url = MongoUrl;
// const options = {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// }

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//     // In development, use a global variable so the client is not recreated
//     if (!global._mongoClient) {
//         global._mongoClient = new MongoClient(url, options);
//     }
//     client = global._mongoClient;
//     clientPromise = client.connect();
// } else {
//     // In production, create a new MongoClient instance
//     client = new MongoClient(url, options);
//     clientPromise = client.connect();
// }

// // Export the clientPromise for connection
// export default clientPromise
