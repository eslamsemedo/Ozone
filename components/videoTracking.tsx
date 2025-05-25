import React from 'react'

export default function videoTracking() {
  const stats = [
    { title: 'Water', value: '60%', progress: 60 },
    { title: 'Calories', value: '845', progress: 75 },
    { title: 'Strength', value: '90%', progress: 90 },
  ];

  const timerWorkout = true;
  return (
    <>




      {/* Main Dashboard Container */}
      <main className=" max-w-6xl m-auto bg-[#0D1117] rounded-2xl p-8 max-[900px]:p-2 shadow-lg w-full">
        {/* Top Section (Timer + Hero Image) */}
        {/* Hero Image */}
        <section className="grid grid-cols-2 grid-rows-3 justify-items-center min-[650px]:grid-cols-4 min-[650px]:grid-rows-2 gap-[32px] max-[900px]:gap-[8px]">
          <div className="row-span-2 col-span-2 min-[650px]:row-span-2 min-[650px]:col-span-3 bg-gray-800 rounded-xl overflow-hidden flex justify-center items-center w-full max-[900px]:h-[390px]">
            <img
              src="https://images.pexels.com/photos/8860959/pexels-photo-8860959.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Workout Hero"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Timer Card */}
          <div className="row-span-1 col-span-1 w-full max-w-[300px] max-h-[300px]  bg-[#040e34] rounded-xl ">
            <div className=" flex flex-col text-center items-center justify-center  h-[40%]">
              {timerWorkout
                ? (
                  <h2 className="text-4xl text-[#f6f6f6] mb-1 text-center ">00:00</h2>
                )
                : (
                  <>
                    <h2 className="text-3xl text-orange-500 mb-1 text-center ">Reps: 0</h2>
                    <span className="text-gray-400 ">00:00</span>
                  </>
                )
              }
            </div>
            <div className=' h-[60%] flex p-2.5'>



              <div className="w-full flex flex-col items-end gap-2.5 self-end">
                <button className=" w-full m-auto  bg-[#147c31]  text-white py-3 rounded-lg font-bold">
                  Started
                </button>
                <button className="w-full m-auto bg-[#a31414] text-white py-3 rounded-lg font-bold">
                  Stop
                </button>
              </div>
            </div>
          </div>

          <div className="row-span-1 col-span-1 w-full max-w-[300px] max-h-[300px]  bg-[#040e34] rounded-xl p-2.5">
            <div className="text-center h-[60%]">
              <div className="w-full  flex items-center justify-center  rounded-lg opacity-90">

                <img
                  src="/img/p4.jpg"
                  alt="Community member"
                  className='h-[80px] lg:h-[120px]'
                />
              </div>
              <span className="text-gray-400">Push Up</span>
            </div>
            <div className="flex flex-row h-[40%] items-end justify-between gap-2.5">
              <button className="w-full bg-[#3e3ed3cc]  text-white py-3 rounded-lg font-bold">
                brev
              </button>
              <button className="w-full bg-[#3e3ed3cc]  text-white py-3 rounded-lg font-bold">
                next
              </button>
            </div>
          </div>
        </section>
        {/* Middle Section (Workouts List + Camera Tracking) */}
      </main>


    </>
  )
}
