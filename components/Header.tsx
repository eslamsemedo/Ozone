"use client"
import { FaSearch } from "react-icons/fa";
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
// import { cn } from '../lib/utils';



export default function Header() {
  return (<>
    <header className=" md:block sticky p-1 top-1 font-sans col-span-full z-50">
      <div className=' bg-gradient-to-r from-[#3f9bd8] to-[#0F4C75]  shadow-xl flex justify-between items-center w-full mx-auto py-9 px-14 rounded-xl h-14'>
        <div className="logo transform translate-x-7 font-bold text-sm sm:text-2xl flex items-center justify-center gap-2">
          {/* <span className='text-slate-400 sm:text-3xl'>Ozone</span> */}
          {/* <FontAwesomeIcon icon="fa-regular fa-dumbbell" /> */}

          <img className="w-[50px] cursor-pointer " src="/dumbbell.png" />



          <h1 className='text-black sm:text-3xl'>Ozone</h1>
        </div>
        <div className="flex gap-10 font-semibold text-black ">

          {["home", "about","service", "contact"].map((value, i) => (
            <Link
              key={i}
              href="#hero"
              scroll={false}
              className="text-[18px] hover:text-[#004AAD] hover:scale-110 duration-300 ease-in-out rounded-full hover:bg-[#ffffff] p-2 transition-all cursor-pointer"
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById(value);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>))}
        </div>
        <SignedIn>
            <UserButton/>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button className="bg-[#000] hover:bg-[#1e2946] cursor-pointer transition-all duration-300 text-white font-semibold px-4 py-2 rounded-lg">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header >
  </>
  )
}
