import Link from 'next/link'
import React from 'react'

export default function magicBtn({setter}:{setter: React.Dispatch<React.SetStateAction<any>>}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Generate Your Workout Plan</h1>
        <Link href="/generateDeitPlan">
          <button
            // onClick={() => getDeitPlan()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            Generate
          </button>
        </Link>
        {/* <button
          onClick={() => setter(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Generatee
        </button> */}
      </div>
  )
}
