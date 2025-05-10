import { motion } from 'framer-motion'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

export default function con3() {
  return (
    <section className="bg-black text-white md:px-[60px] lg:px-[150px] md:py-[120px] flex justify-center items-center sec4">
      <div className="bg-black bg-opacity-50 flex flex-col md:flex-row w-full max-w-6xl rounded-lg overflow-hidden">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Join the OZONE Community</h2>
          <p className="text-gray-300 mb-6">
            Become part of a vibrant fitness community and access exclusive resources.
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-2">
              <FaCheck className="text-blue-400 mt-1" />
              Weekly Fitness Tips & Guides
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-blue-400 mt-1" />
              Exclusive Discounts on Fitness Gear
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-blue-400 mt-1" />
              Chance to Feature in Our Success Stories
            </li>
          </ul>

          <div className='flex justify-items-start gap-5 items-center mt-5 text-black'>
            <motion.button
              whileHover={{ scale: 1.10, backgroundColor: '#1e2231', color: 'white', transition: { duration: 0.2 } }}  //hover:scale-110 hover:bg-[#1e2231] hover:text-white
              className=" bg-[#007bff] p-4 rounded-tr-[20px] rounded-bl-[20px] cursor-pointer outline-none border-none font-bold "
            >
              Start Your journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.10, backgroundColor: '#1e2231', color: 'white', transition: { duration: 0.2 } }}
              className=" bg-[#ffa500] p-4 rounded-tr-[20px] rounded-bl-[20px] cursor-pointer outline-none border-none font-bold"
            >
              Dicsover More
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side */}
        <div className="flex-1 relative min-h-[400px]">
          <img
            src="/img/p4.jpg"
            alt="Community member"
            className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-90"
          />
        </div>
      </div>
    </section>
  )
}
