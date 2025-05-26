// import { SignedOut, SignInButton } from '@clerk/clerk-react'
// import { UserButton } from '@clerk/nextjs'
// import { motion } from 'framer-motion'
// import React from 'react'
// import { Button } from '../ui/button'

// export default function hero() {
//   return (
//     <>
//       <div
//         className="h-screen bg-cover bg-center"
//         style={{ backgroundImage: "url('/img/p2.jpg')" }}
//         id='home'
//       >
//         <div className="absolute top-1/2 left-1/2 md:left-[70%] lg:left-[75%] -translate-x-1/2 -translate-y-1/2 transform text-center w-full max-w-md p-5">
//           <motion.div
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className=" text-3xl md:text-[40px] text-white font-bold">
//               Unleash Your Potential with{" "}
//               <span className="bg-gradient-to-r from-[#3f9bd8] to-[#0F4C75] bg-clip-text text-transparent">OZONE</span>
//             </h1>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             <p className="text-center text-[#6c757d] hidden md:block">
//               Join the ultimate fitness journey with OZONE. Our personalized
//               plans and expert guidance will transform your workouts and elevate
//               your health.
//             </p>
//           </motion.div>
//           <div className="flex flex-col md:flex-row justify-center gap-5 items-center mt-5">
//             <SignInButton>
//                 <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
//                 whileHover={{
//                   scale: 1.1,
//                   backgroundColor: "linear-gradient(to right, #3f9bd8, #0F4C75)",
//                   color: "#ffffff",
//                   transition: { duration: 0.2 },
//                 }}
//                 className="bg-gradient-to-r from-[#3f9bd8] to-[#0F4C75] p-4 rounded-tr-[20px] rounded-bl-[20px] cursor-pointer outline-none border-none font-bold w-full md:w-auto"
//                 >
//                 Start Your Journey
//                 </motion.div>
//             </SignInButton>

//             <motion.button
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
//               whileHover={{
//                 scale: 1.1,
//                 backgroundColor: "linear-gradient(to right, #0F4C75, #A90001)",
//                 color: "#ffffff",
//                 transition: { duration: 0.2 },
//               }}
//               className="bg-gradient-to-r from-[#0F4C75] to-[#A90001] p-4 rounded-tr-[20px] rounded-bl-[20px] cursor-pointer outline-none border-none font-bold w-full md:w-auto"
//             >
//               Discover More
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
'use client';

import Image from 'next/image';
import { SignedOut, SignInButton } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React from 'react';

// ✅ Static import lets Next.js pre-optimise and generate
//    multiple sizes + a blurred placeholder automatically
import bg from '@/public/img/p2.jpg';

export default function Hero() {
  return (
    <section id="home" className="relative isolate h-screen overflow-hidden">
      {/* Optimised responsive hero */}
      <Image
        src={bg}
        alt="Gym banner – man lifting weights"
        fill
        priority
        placeholder="blur"
        quality={75}
        sizes="100vw"
        className="object-cover"
      />

      {/* Content overlay */}
      <div className="absolute top-1/2 left-1/2 md:left-[70%] lg:left-[75%] -translate-x-1/2 -translate-y-1/2 transform text-center w-full max-w-md p-5">
        <div className="w-full max-w-md p-5 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-white md:text-[40px]"
          >
            Unleash Your Potential with{' '}
            <span className="bg-gradient-to-r from-[#3f9bd8] to-[#0F4C75] bg-clip-text text-transparent">
              OZONE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden text-[#6c757d] md:block"
          >
            Join the ultimate fitness journey with OZONE. Our personalised plans and expert guidance will transform your workouts and elevate your health.
          </motion.p>

          <div className="mt-5 flex flex-col items-center justify-center gap-5 md:flex-row">
            {/* ---- Call-to-action 1 ---- */}
            <SignInButton>
              <motion.button
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'linear-gradient(to right, #3f9bd8, #0F4C75)',
                  color: '#ffffff',
                  transition: { duration: 0.2 },
                }}
                className="w-full cursor-pointer rounded-bl-[20px] rounded-tr-[20px] bg-gradient-to-r from-[#3f9bd8] to-[#0F4C75] p-4 font-bold md:w-auto"
              >
                Start Your Journey
              </motion.button>
            </SignInButton>

            {/* ---- Call-to-action 2 ---- */}
            <motion.button
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: 'linear-gradient(to right, #0F4C75, #A90001)',
                color: '#ffffff',
                transition: { duration: 0.2 },
              }}
              className="w-full cursor-pointer rounded-bl-[20px] rounded-tr-[20px] bg-gradient-to-r from-[#0F4C75] to-[#A90001] p-4 font-bold md:w-auto"
            >
              Discover More
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

