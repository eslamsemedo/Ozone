"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion';

export default function con2() {

  const info = [

    {
      title: "Personalized Coaching",
      description: "Receive custom workout plans designed by our expert trainers.",
    },
    {
      title: "Interactive Events",
      description: "Engage with fellow fitness enthusiasts through our dynamic events.",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your fitness journey with our comprehensive tracking tools.",
    },
    {
      title: "Expert Tips",
      description: "Gain insights and advice from top fitness professionals.",
    },

  ]

  return (
    <>
      <div
        id='service'
        className='flex flex-col lg:flex-row bg-[white] items-center justify-between py-[40px]  lg:p-[50px] xl:p-[150px]'>


        <div className='w-[90%] md:w-[450px] mb-6 md:ml-8 '>
          <div className='' >
            <h2 className='text-[30px] text-center md:text-start md:text-[50px] mb-5 text-[#1a1a1a] font-bold'>Tailored Fitness Solutions</h2>
            <p className=' mb-[20px] text-center md:text-start'>Explore OZONE's personalized coaching plans that adapt to your unique fitness needs and goals.</p>

          </div>
          <div className='flex justify-center md:justify-start gap-5 items-center mt-5 text-black'>

            <button className='bg-[#f2f2f2] flex items-center gap-2 px-6 py-3 cursor-pointer rounded-2xl text-gray-700 font-semibold shadow-lg shadow-[#007bff8a] transition-all duration-300 hover:bg-[#000] hover:text-[#fff] hover:scale-105'> Learn More</button>
          </div>
        </div>


        <div className=' grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 md:w-[50%]  h-auto m-5'>
          {/* <div className=' grid md:grid-cols-2 gap-8 w-[60%] h-auto m-5'> */}
          {
            info.map((item, index) => (
              <div key={index} className=" flex justify-center items-center w-[100%] ">
                <div
                  className={cn(
                    "h-[200px]   group cursor-pointer overflow-hidden relative card rounded-md shadow-xl mx-auto flex flex-col justify-center p-4 border border-transparent dark:border-neutral-800",
                    "bg-[url('/img/fitness2.jpg')] bg-cover",
                    // Preload hover image by setting it in a pseudo-element
                    "before:bg-[url('/img/fitness1.jpg')] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                    "hover:bg-[url('/img/fitness1.jpg')]",
                    "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                    "transition-all duration-500"
                  )}
                >
                  <div className="relative z-40 flex flex-col items-center justify-center gap-3">
                    <h1 className="font-bold w-full text-xl md:text-2xl text-gray-50 relative">
                      Background Overlays
                    </h1>
                    <p className="font-normal w-full text-base text-gray-50 relative">
                      This card is for some special elements, like displaying background
                      gifs on hover only.
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div >
    </>
  )
}
