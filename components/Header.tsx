"use client"
import { FaSearch } from "react-icons/fa";
import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
// import { cn } from '../lib/utils';



export default function Header() {
  const { user } = useUser();
  // const username = user?.username || "";

  return (
    <>
      <header className=" md:block sticky p-1 top-1 font-sans col-span-full z-50 ">
        <div className=' bg-gradient-to-r from-[#3f9bd8] to-[#0F4C75]  shadow-xl flex md:justify-between justify-center items-center w-full mx-auto py-9 md:px-14 px-6 rounded-xl h-16 '>

          <SignedIn>
            <Link href="/home">
            <div className=" hidden md:flex logo transform translate-x-7 font-bold text-sm sm:text-2xl  items-center justify-center gap-2">
              {/* <span className='text-slate-400 sm:text-3xl'>Ozone</span> */}
              {/* <FontAwesomeIcon icon="fa-regular fa-dumbbell" /> */}

              <img className="w-[50px] cursor-pointer " src="/dumbbell.png" />

              <h1 className='text-black sm:text-3xl'>Ozone</h1>
            </div>
            </Link>
            

            <div className="flex gap-2 font-semibold text-black bg-[#000] p-2 rounded-full items-center justify-center">
              <UserButton />
              <p className="text-white">{user?.fullName}</p>
            </div>
            <div className=" hidden md:flex gap-2 font-semibold text-black cursor-pointer">
              <SignOutButton />
            </div>

          </SignedIn>

          <SignedOut>
            <div className="flex justify-between items-center w-full">

              <div className=" flex logo  font-bold text-sm sm:text-2xl  items-center justify-center gap-2">
                {/* <span className='text-slate-400 sm:text-3xl'>Ozone</span> */}
                {/* <FontAwesomeIcon icon="fa-regular fa-dumbbell" /> */}

                <Image className="w-[50px] cursor-pointer " src="/dumbbell.png" width={50} height={50} alt="dumbbell" />

                <h1 className='text-black sm:text-3xl'>Ozone</h1>
              </div>
              <div className="flex gap-2 font-semibold text-black cursor-pointer">

                {["home", "about", "service", "contact"].map((value, i) => (
                  <Link
                    key={i}
                    href="#hero"
                    scroll={false}
                    className=" hidden md:block text-[18px] hover:text-[#004AAD] hover:scale-110 duration-300 ease-in-out rounded-full hover:bg-[#ffffff] p-2 transition-all cursor-pointer "
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
              <SignInButton>
                <Button className="bg-[#000] hover:bg-[#1e2946] cursor-pointer transition-all duration-300 text-white font-semibold px-4 py-2 rounded-lg">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      </header >
    </>
  )
}
