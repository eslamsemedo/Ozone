import React from 'react'

export default function workoutCard({id}:{id:number}) {
  return (
    <div className="relative  group w-[190px] h-[254px] bg-[#171717] flex justify-center items-center overflow-hidden cursor-pointer shadow-[0_0_3px_1px_rgba(0,0,0,0.533)]">
      <div className="relative z-10 w-[186px] h-[250px] p-5 bg-[#171717] rounded-[5px] flex justify-center items-center text-white overflow-hidden">
        <span>Plan {id}</span>
        <div className="absolute w-[5px] h-[50px] bg-white blur-[50px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      <div className="absolute w-[80px] h-[360px] bg-gradient-to-b from-[#ff2288] to-[#387ef0] opacity-0 transition-opacity duration-300 animate-none group-hover:opacity-100 group-hover:animate-rotation"></div>
      <div className="absolute w-[250px] h-[360px] bg-[#17171733] backdrop-blur-[50px]"></div>
    </div>
  )
}