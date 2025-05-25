
import { useState } from 'react';
interface onclick {
  onClick?: () => void;
}


export default function PulsingButton({ onClick }: onclick) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="absolute top-[70px] h-[83%] w-full flex flex-wrap gap-[10px] p-[10px]">

    
    <div className="flex justify-center items-center h-[500px] w-full bg-gradient-radial from-blue-950 to-black overflow-hidden font-sans">
      <div className="relative flex justify-center items-center">
        {/* Pulsing rings */}
        <div className="absolute w-52 h-52 rounded-full border-2 border-cyan-400 opacity-60 shadow-lg shadow-cyan-400 animate-pulse-1"></div>
        <div className="absolute w-52 h-52 rounded-full border-2 border-cyan-400 opacity-60 shadow-lg shadow-cyan-400 animate-pulse-2"></div>
        <div className="absolute w-52 h-52 rounded-full border-2 border-cyan-400 opacity-60 shadow-lg shadow-cyan-400 animate-pulse-3"></div>
        
        {/* Center button */}
        <button
          className={`relative z-10 px-12 py-4 text-xl text-cyan-400 bg-black bg-opacity-50 border-2 border-cyan-400 rounded-full shadow-lg shadow-cyan-400 cursor-pointer transition-all duration-300 backdrop-blur-md ${isHovered ? 'scale-105 bg-opacity-70' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
        >
          GENERATE NOW
        </button>
      </div>
      
      {/* Add Tailwind keyframes and custom animations */}
      <style jsx global>{`
        @keyframes pulse-1 {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse-2 {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse-3 {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-pulse-1 {
          animation: pulse-1 2s infinite ease-out;
        }
        .animate-pulse-2 {
          animation: pulse-2 2s infinite ease-out;
          animation-delay: 0.6s;
        }
        .animate-pulse-3 {
          animation: pulse-3 2s infinite ease-out;
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
    </div>
  );
}
