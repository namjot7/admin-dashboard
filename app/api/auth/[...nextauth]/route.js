import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequestAdapter } from "next-auth/next";

const adminEmails = ["namjotsinghkaler12@gmail.com"];

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    // adapter: MongoDBAdapter(clientPromise),
    // debug: true, // Enable debug mode

    // Admin login security
    callbacks: {
        session: ({ session, token, user }) => {
            if (adminEmails.includes(session?.user?.email)) {
                // console.log({ session, token, user });
                return session;
            }
            return false; // goes back to the login with google button screen

        }
    }
})
// Not working
export async function checkAdmin(req, res) {
    const session = await getServerSession(req, res, handler);
    console.log("Session:", session);

    if (!adminEmails.includes(session?.user?.email)) {
        throw new Error("You are not an Admin.");
    }
}


// export default NextAuth(authOptions)
export { handler as GET, handler as POST }
