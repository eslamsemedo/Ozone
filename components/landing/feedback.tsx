import { User } from 'lucide-react'
import React from 'react'

export default function feedback() {

  const info = [
    {
      user: "Eslam Mokhtar",
      comment: "Receive custom workout plans designed by our expert trainers.",
    },
    {
      user: "Zeyad Mohamed",
      comment: "Engage with fellow fitness enthusiasts through our dynamic events.",
    },
    {
      user: "Reyad Mohamed",
      comment: "Monitor your fitness journey with our comprehensive tracking tools.",
    },

  ]

  return (
    <div>
      <h2 className=' text-center text-[50px] text-[#191d2b]'>Feedback</h2>

      <div className='flex flex-col xl:flex-row justify-between items-center w-[80%] mx-auto my-[50px]'>

        {
          info.map((item, index) => (
            <div key={index} className=" max-w-[700px] mb-5  bg-[linear-gradient(163deg,_#ffa500_0%,_#3DC2EC_100%)] rounded-[20px] transition-all duration-100 hover:shadow-[0_0_30px_1px_rgba(0,255,117,0.3)] items-center justify-center">
              <div className="p-5 w-full h-full bg-[#2b3247] transition-all duration-500 rounded-2xl hover:scale-[0.98] hover:bg-[#191d29] hover:rounded-[20px]  text-white">
                <p className='text-[#9f9f9f] h-[55%]'>{item.comment}</p>
                <hr></hr>
                <div className='flex items-center gap-2 mt-2'>
                  <User className='text-[#0c46c3] w-[50px] h-[50px] rounded-full bg-[#2b3247] p-2' />
                  <h3 className='font-bold'>{item.user}</h3>
                </div>
              </div>
            </div>
          ))
        }


      </div>
    </div>
  )
}
