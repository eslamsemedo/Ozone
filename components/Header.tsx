import { FaSearch } from "react-icons/fa";

import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
// import { cn } from '../lib/utils';



export default function Header() {
    return (<>
        <header className=" md:block z-50 sticky p-1 top-0 font-sans col-span-full">
            <div className=' bg-gradient-to-r from-[#20584d] to-[#1e90ff]  shadow-xl flex justify-between items-center max-w-6xl mx-auto p-3 rounded-xl h-14'>
                <h1 className=' transform translate-x-7 font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-400'>Ozone</span>
                    <span className='text-slate-100'>Website</span>
                </h1>
                <ul className="flex gap-2 font-semibold text-black ">
                    <li className="hidden sm:inline hover:underline">home</li>
                    <li className="hidden sm:inline hover:underline">about</li>
                    <li>
                        {/* user signed in */}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        {/* user signed out */}
                        <SignedOut>
                            <div className=" cursor-pointer">
                                <SignInButton />
                            </div>
                        </SignedOut>
                    </li>
                </ul>
            </div>
        </header >
    </>
    )
}
