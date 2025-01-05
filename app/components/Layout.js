"use client"
import Navbar, { AdminLogo } from "@/app/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { ThemeContext, ThemeToggler } from "./ThemeContext";


export default function Layout({ children }) {
    const { data: session } = useSession();
    // console.log(session);

    // Not logged in
    if (!session) {
        return (
            <div className="bg-primary dark:bg-gray-800 w-screen h-screen flex items-center justify-center">
                <button onClick={() => signIn('google')} className="bg-white rounded-md px-3 flex items-center gap-2">
                    <img className="w-10" src="./google-icon.jpg" /> Login with Google
                </button>
                <ThemeToggler />
            </div>
        )
    }
    // Logged in
    return (
        <div className="relative bg-primary text-white dark:bg-slate-900 flex flex-col md:flex-row  max-w-screen min-h-screen">
            <Navbar />
            <div className="relative m-3 p-5 bg-white dark:bg-slate-800 flex-grow rounded-lg">
                {children}
                <ThemeToggler />
            </div>
        </div>
    );
}
