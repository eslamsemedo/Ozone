import { currentUser } from '@clerk/nextjs/server';
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


    // console.log(await currentUser())
    return (
        <div
            className="h-full flex flex-col justify-center items-center text-[#6c94d9] font-sans rounded-3xl "
            style={{ background: "radial-gradient(circle, #21698e, #000000)" }}
        >

            <h1 className="text-[2rem] sm:text-[3rem] md:text-[3rem] italic mb-[15px] sm:mb-[10px] font-[cursive]">
                YOUR WEEK PLAN
            </h1>
            {/* First week row */}
            <div className="flex flex-wrap mt-[20px] gap-[10px] md:gap-[20px] justify-center items-center lg:pr-32 lg:pl-32">
                {
                    weekDays.map((day, index) => (
                        today === day ?
                            <Link href="/workout" passHref key={index}>
                                <div className="no-underline block">
                                    <div className="bg-gradient-to-l from-[#091171] to-[#333] p-5 w-[100px] h-[100px] md:w-[150px] md:h-auto text-center rounded-[30px] text-[2rem] shadow-md transition-transform duration-200 ease-in-out relative z-[1] hover:-translate-y-[5px]">
                                        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-[#3b409a] text-[rgb(183,181,181)] px-[10px] py-[5px] rounded-[10px] text-[1.3rem] font-bold">
                                            <label className="cursor-pointer">Today</label>
                                        </div>
                                        <p className="my-[5px] text-[20px] italic text-[#958f8f] transition-all duration-300">
                                            {day}
                                        </p>
                                        <p className="my-[5px] text-[0.9rem] text-[#0c0c0c] font-bold transition-all duration-300">
                                            {index + 21} June
                                        </p>
                                    </div>
                                </div>
                            </Link> :
                            <div key={index} className="bg-gradient-to-l from-[#091171] to-[#333] p-5 w-auto h-[100px] md:w-[150px] md:h-auto text-center rounded-[30px] text-[2rem] shadow-md transition-transform duration-200 ease-in-out relative z-[1] hover:-translate-y-[5px]">
                                <p className="my-[5px] text-[20px] italic text-[#958f8f] transition-all duration-300">
                                    {day}
                                </p>
                                <p className="my-[5px] text-[0.9rem] text-[#0c0c0c] font-bold transition-all duration-300">
                                    {index + 21} June
                                </p>
                            </div>
                    ))
                }
            </div>
        </div>
    )
}
