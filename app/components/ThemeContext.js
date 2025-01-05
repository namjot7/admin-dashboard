import React, { createContext, useContext, useEffect } from 'react'
import { MoonIcon, SunIcon } from '../assets/icons';

export const ThemeContext = createContext();

export const ThemeToggler = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    // Initialize theme from localStorage or default to light
    useEffect(() => {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        const savedTheme = localStorage.getItem('theme') || systemTheme;
        setTheme(savedTheme);
        document.documentElement.classList.add(savedTheme);
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);

        localStorage.setItem('theme', newTheme); // Persist theme
    }
    return (
        <div className='absolute top-5 right-5 cursor-pointer'>
            {/* 2nd way */}
            <div onClick={e => toggleTheme()} className="bg-slate-700 relative rounded-full w-20 h-8 hover:bg-slate-500 transition-all duration-500">
                <button
                    className={`${theme == 'dark' ? 'left-12' : 'left-2'} text-white absolute top-1 transition-all duration-500`}>
                    <MoonIcon />
                </button>
            </div>
            {/* 1st way */}
            {/* <button onClick={(e) => toggleTheme()}
                className={`${theme == 'light' ? 'hidden' : ""} text-yellow-500 p-2`}>
                <SunIcon />
            </button>
            <button onClick={e => toggleTheme()}
                className={`${theme == 'light' ? '' : "hidden"} bg-gray-900 text-gray-200 p-2`}>
                <MoonIcon />
            </button> */}
        </div>
    );
}
