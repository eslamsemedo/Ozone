"use client"
import { X } from 'lucide-react';
import React, { useState } from 'react'

const chatbot = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="fixed bottom-5 right-5">
        {/* <button className="bg-black p-2 rounded-full text-white" onClick={() => setShowModal(true)}>
              Chat with AI
            </button> */}
        <button
          onClick={() => setShowModal(true)}
          className=" cursor-pointer bg-gray-950 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Chat with AI
        </button>
      </div>

      {showModal && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button className="absolute text-2xl w-[25px] h-[25px] flex items-center justify-center text-black  top-2 right-2 rounded-full hover:text-red-500 cursor-pointer transition-all duration-300" onClick={() => setShowModal(false)}>
              x
            </button>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/WH3ptLNIzYZXbqddSdFk7"
              width="400px"
              height="500px"
              style={{ border: 'none', borderRadius: '8px' }}>
            </iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default chatbot
