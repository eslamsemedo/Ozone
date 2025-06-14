import connectDB from '@/mongoDB/db';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];


  

  Date.now()
  const today = new Date().toLocaleString('en-US', { weekday: 'long' });


  return (
    <div
      className="bg-gradient-to-br from-[#000000] to-[#0F4C75] h-full flex flex-col justify-center items-center text-[#eef2f4] font-sans rounded-3xl "
      // white color by ahmed abokhshiem
    >
      <div className="text-4xl font-bold text-center mb-4">
        Welcome to FitTrack
      </div>
      <div className="text-lg text-center mb-8">
        Your personalized fitness journey starts here!
      </div>
      <div className="text-lg text-center mb-8">
        Today is {today}
      </div>
      <Link href="/home/workouts" className="bg-[#3282B8] text-white px-4 py-2 rounded-full hover:bg-[#0F4C75] transition duration-300">
        Get Started
      </Link>
    </div>
  )
}
