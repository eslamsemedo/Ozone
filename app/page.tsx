"use client"

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Hero from "@/components/landing/hero";
import Con2 from "@/components/landing/con2";
import Feedback from "@/components/landing/feedback";
import Con3 from "@/components/landing/con3";
import Footer from "@/components/landing/footer";



export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && !hasRun.current) {
      hasRun.current = true;
      myPostSignInFunction();
      router.push("/home");
    }
  }, [isLoaded, isSignedIn, router]);


  return (
    <>
      <Hero />
      <Con2 />
      <div className="bg-[url('/img/p3.jpg')] bg-fixed h-[250px] bg-cover"></div>
      <Feedback />
      <Con3 />
      <Footer />
    </>
  );
}

// define whatever you need to run:
function myPostSignInFunction() {
  console.log("🎉 user just signed in!");
  // e.g. fetch user profile, track analytics, initialize data…
  // connectDB();

}