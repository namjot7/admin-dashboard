"use client"
import Nav, { AdminLogo } from "@/app/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { ThemeContext, ThemeToggler } from "./ThemeContext";


export default function Layout({ children }) {
    const { data: session } = useSession();
    // console.log(session);
    // const { theme } = useContext(ThemeContext)

    const [showNav, setshowNav] = useState(false);
    // console.log(theme);

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
        <div className="bg-primary text-white dark:bg-primary_dark flex flex-col md:flex-row  max-w-screen min-h-screen  md:p-3">

            <Nav showNav={showNav} />
            {/* Mobile Nav bar */}
            <div className="md:hidden bg-black px-3 py-2 flex justify-between items-center">
                <button className='z-50 size-9' onClick={e => setshowNav(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <div className="flex flex-grow justify-center text-lg">
                    <AdminLogo />
                </div>
            </div>

            <div className="p-5 bg-white dark:bg-gray-900 flex-grow rounded-lg">
                {children}
                <ThemeToggler />
            </div>
        </div>
    );
}
