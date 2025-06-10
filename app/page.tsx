"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/landing/hero";
import Con2 from "@/components/landing/con2";
import Con3 from "@/components/landing/con3";
import Footer from "@/components/landing/footer";
import { useAuth } from "@clerk/nextjs";
import { checkDatabase } from "./lib/actions";
import Header from "@/components/Header";
import Coaches from "@/components/landing/coaches";
import Stories from "@/components/landing/stories";
import Blog from "@/components/landing/blog";

export default function Home() {

  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();


  useEffect(() => {
    if (isLoaded && isSignedIn) {


      checkDatabase()
      // router.replace("/home"); // Use replace to avoid adding to history stack
      router.push("/home"); // Use push to navigate to the home page
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) {
    // Prevent rendering the page until auth state is determined
    return null;
  }
  // if (!isLoaded) {
  //   // Prevent rendering the page until auth state is determined
  //   return null;
  // }

  return (
    <>
      <div className="m-auto w-[99%] sticky z-50 top-1">
        <Header />
      </div>
      <Hero />
      <Con2 />
      <div className="bg-[url('/img/p3.jpg')] bg-fixed h-[250px] bg-cover"></div>
      <Coaches />
      <div className="bg-[url('/img/p3.jpg')] bg-fixed h-[250px] bg-cover"></div>
      <Stories />
      <div className="bg-[url('/img/p3.jpg')] bg-fixed h-[250px] bg-cover"></div>
      <Blog />
      <Con3 />
      <Footer />
    </>
  );
}