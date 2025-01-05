"use client"
import { SessionProvider } from "next-auth/react"
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

const SessionWrapper = ({ children }) => {
    const [theme, setTheme] = useState(true);

    return (
        // Next Auth and Theme Provider (dark theme)
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeContext.Provider>
    )
}

export default SessionWrapper;