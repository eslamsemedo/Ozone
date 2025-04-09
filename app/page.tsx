"use client"

import Header from "@/components/Header";
import HeaderMobile from "@/components/header-mobile";
import connectDB from "@/mongoDB/db";
import { User } from "@/mongoDB/models/User";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  return (
    <>
      <div className="text-gray-400">
        <SignedOut>
          {/* <SignIn  afterSignInUrl="/home" >
          <SignInButton />
          </SignIn> */}
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}