import { SignedOut, SignInButton } from '@clerk/clerk-react'
import { UserButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import React from 'react'
import { Button } from '../ui/button'

export default function hero() {
  return (
    <>
      <div
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/img/p2.jpg')" }}
      >
        <div className="absolute top-1/2 left-1/2 md:left-[70%] lg:left-[75%] -translate-x-1/2 -translate-y-1/2 transform text-center w-full max-w-md p-5">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className=" text-3xl md:text-[40px] text-white font-bold">
              Unleash Your Potential with{" "}
              <span className="text-[#007bff]">OZONE</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-center text-[#6c757d] hidden md:block">
              Join the ultimate fitness journey with OZONE. Our personalized
              plans and expert guidance will transform your workouts and elevate
              your health.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-center gap-5 items-center mt-5">
            <SignInButton>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#1e2231",
                  color: "#ffffff",
                  transition: { duration: 0.2 },
                }}
                className="bg-[#007bff] p-4 rounded-tr-[20px] rounded-bl-[20px] cursor-pointer outline-none border-none font-bold w-full md:w-auto"
              >

                Start Your Journey
              </motion.div>
            </SignInButton>

            <motion.button
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#1e2231",
                color: "#ffffff",
                transition: { duration: 0.2 },
              }}
              className="bg-[#ffa500] p-4 rounded-tr-[20px] rounded-bl-[20px] cursor-pointer outline-none border-none font-bold w-full md:w-auto"
            >
              Discover More
            </motion.button>
          </div>
        </div>
      </div>
    </>
  )
}
