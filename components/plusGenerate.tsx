import Link from 'next/link'
import React from 'react'

export default function plusGenerate() {
  return (
    <div className="relative group w-[190px] h-[254px] bg-[#171717] flex justify-center items-center overflow-hidden cursor-pointer shadow-[0_0_3px_1px_rgba(0,0,0,0.533)]">
      <div className="relative z-10 w-[186px] h-[250px] p-5 bg-[#171717] rounded-[5px] flex justify-center items-center text-white overflow-hidden">
        <span>
          <Link href={"/generateWorkout"}>
            <button
              title="Add New"
              className="group cursor-pointer outline-none duration-300 hover:rotate-90"
            >
              <div
                className="relative w-12 h-12 border-[1.5px] border-pink-400 rounded-full transition-colors duration-300 group-hover:bg-pink-800 group-active:border-pink-200 group-active:bg-pink-600"
              >
                <div
                  className="absolute top-1/2 left-1/2 w-6 h-[1.5px] bg-pink-400 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 group-hover:bg-white group-active:bg-pink-200"
                />
                <div
                  className="absolute top-1/2 left-1/2 h-6 w-[1.5px] bg-pink-400 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 group-hover:bg-white group-active:bg-pink-200"
                />
              </div>
            </button>
          </Link>
        </span>
        <div className="absolute w-[5px] h-[50px] bg-white blur-[50px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      <div className="absolute w-[80px] h-[360px] bg-gradient-to-b from-[#ff2288] to-[#387ef0] opacity-0 transition-opacity duration-300 animate-none group-hover:opacity-100 group-hover:animate-rotation"></div>
      <div className="absolute w-[250px] h-[360px] bg-[#17171733] backdrop-blur-[50px]"></div>
    </div>
  )
}


