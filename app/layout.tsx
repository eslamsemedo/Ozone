import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeaderMobile from "@/components/header-mobile";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import connectDB from "@/mongoDB/db";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Chatbot from "@/components/chatbot";

// derdyrdyred

export const metadata: Metadata = {
  title: "Ozone Website",
  description: "Ozone Fitness Platform",
  icons: {
    icon: '/dumbbell.png',       // the “standard” link
    shortcut: '/dumbbell.png',   // what many browsers actually look for
    // — if you have an apple-touch-icon: 
    apple: '/dumbbell.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <ClerkProvider>
      <html lang="en">
      
        <body
          className={``}
        >
          {children}
          <Toaster />
          {/* chatbot AI */}

          
          
          
        </body>
      </html>
    </ClerkProvider>
  );
}
