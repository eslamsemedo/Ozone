"use client"
import React from 'react'
import { cn } from '@/lib/utils'

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
      <div className='flex bg-white items-center justify-between py-[40px]'>
        <div className='w-[450px] ml-8'>
          <div >
            <h2 className='text-[50px] mb-5 text-[#1a1a1a] font-bold'>Tailored Fitness Solutions</h2>
            <p className=' mb-[20px]'>Explore OZONE's personalized coaching plans that adapt to your unique fitness needs and goals.</p>

          </div>
          <button className='bg-[#f2f2f2] flex items-center gap-2 px-6 py-3 cursor-pointer rounded-2xl text-gray-700 font-semibold shadow-lg shadow-[#007bff8a] transition-all duration-300 hover:bg-[#000] hover:text-[#fff] hover:scale-105'> Learn More</button>
        </div>


        <div className='flex justify-center items-center flex-wrap w-[80%] h-auto gap-5'>
          {
            info.map((item, index) => (
              <div key={index} className=" flex max-w-xs w-full ">
                <div
                  className={cn(
                    "w-[250px] h-[250px] group cursor-pointer overflow-hidden relative card rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                    "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                    // Preload hover image by setting it in a pseudo-element
                    "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                    "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
                    "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                    "transition-all duration-500"
                  )}
                >
                  <div className="text relative z-50">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative">
                      Background Overlays
                    </h1>
                    <p className="font-normal text-base text-gray-50 relative my-4">
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
