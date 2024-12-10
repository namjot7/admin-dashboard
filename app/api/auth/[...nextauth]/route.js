import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/db";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    // adapter: MongoDBAdapter(clientPromise),
    // debug: true, // Enable debug mode
})
// export default NextAuth(authOptions)
export { handler as GET, handler as POST }
