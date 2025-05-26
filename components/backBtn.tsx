// import React from 'react'

// interface BackBtnProps {
//   onClick?: () => void;
// }

// export default function backBtn({ onClick }: BackBtnProps) {
//   return (
//     <button
//       className="bg-white text-center w-[150px] rounded-2xl h-14 relative text-black text-xl font-semibold group"
//       type="button"
//       onClick={onClick || (() => window.history.back())}
//     >
//       <div
//         className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[142px] z-10 duration-500"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1024 1024"
//           height="25px"
//           width="25px"
//         >
//           <path
//             d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
//             fill="#000000"
//           ></path>
//           <path
//             d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
//             fill="#000000"
//           ></path>
//         </svg>
//       </div>
//       <p className="translate-x-2">Go Back</p>
//     </button>
//   );
// }

'use client';                // ✅ only needed in the App Router

import { ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';   // `next/router` if you still use the Pages Router
import { ArrowLeft } from 'lucide-react';      // keeps your SVG code tidy

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Where to send the user if the history stack is empty */
  onClick?: () => void;
  fallbackHref?: string;
}

export default function BackButton({
  onClick,
  fallbackHref = '/',
  ...rest
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    // If there’s somewhere to go back to, do it; otherwise redirect
    if (typeof window !== 'undefined' && window.history.length > 2) {
      router.back();                   // Next.js-native history API  [oai_citation:1‡Next.js](https://nextjs.org/docs/pages/api-reference/functions/use-router?utm_source=chatgpt.com)
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      aria-label="Go back"
      className="relative flex h-14 w-40 items-center justify-center rounded-2xl bg-white text-xl font-semibold text-black group"
      onClick={handleClick}
      {...rest}
    >
      {/* animated green bar */}
      <span className="absolute left-1 top-1 h-12 w-1/4 rounded-xl bg-green-400 transition-all duration-500 group-hover:w-[152px]" aria-hidden="true" />

      {/* arrow icon */}
      <ArrowLeft size={24} className="z-10" aria-hidden="true" />

      {/* label */}
      <span className="translate-x-2">Go Back</span>
    </button>
  );
}