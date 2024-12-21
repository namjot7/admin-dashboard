"use client"
import Nav from "@/app/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
    const { data: session } = useSession();
    // console.log(session);

    // Not logged in
    if (!session) {
        return (
            <div className="bg-primary w-screen h-screen flex items-center justify-center">
                <div>
                    <button onClick={() => signIn('google')} className="bg-white rounded-md py-2 px-6">Login with Google</button>
                </div>
            </div>
        )
    }
    // Logged in
    return (
        <div className="flex bg-primary max-w-screen min-h-screen text-white">
            <Nav />
            <button onClick={() => signOut()} className="absolute top-6 right-6 bg-white text-black rounded-md py-1 px-3">Sign out</button>
            <div className="p-5 m-3 bg-gray-800 text-white flex-grow rounded-lg">
                {children}
            </div>
        </div>
    );
}
