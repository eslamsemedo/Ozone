"use client"
import { motion } from 'framer-motion'
import React, { useState } from 'react'


const TAPS = ["About Me", "Summary"] as const;


export default function tabs(
  { classCss, activeTab, setActiveTab }:
    { classCss: string, activeTab: number, setActiveTab: React.Dispatch<React.SetStateAction<any>> }
) {
  // const [activeTab, setActiveTab] = useState<number>(0);
  const tabWidth = 106;
  return (
    <div className={classCss}>
      <div className="relative flex items-center gap-1 overflow-x-auto rounded-xl bg-neutral-100 px-2 py-1 shadow-lg dark:bg-neutral-800 no-scrollbar">
        {/* ── Animated slide bar (behind tabs) ───────── */}
        <motion.div
          layout
          className="flex items-center justify-center pointer-events-none absolute top-0 left-0 h-full rounded-4xl bg-neutral-300/50 dark:bg-neutral-700/60 transition duration-300 ease-in-out"
          style={{ width: tabWidth, translateX: `${activeTab * tabWidth}px` }}
        >
          {/* ── Top & bottom accent bars (optional) ─────── */}
          <motion.div
            layout
            className="pointer-events-none absolute h-1 w-[90%] rounded-b-lg bg-neutral-900 dark:bg-white"
            style={{ top: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
          />
          <motion.div
            layout
            className="pointer-events-none absolute h-1 w-[90%] rounded-t-lg bg-neutral-900 dark:bg-white"
            style={{ bottom: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
          />
        </motion.div>


        {/* ── Tab buttons ─────────────────────────────── */}
        {TAPS.map((label, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`relative z-10 min-w-[100px] select-none whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${activeTab === i ? "text-white" : "text-neutral-900 dark:text-neutral-100"
              }`}
          >
            {label}
          </button>
        ))}

        {/* ── Theme switcher ─────────────────────────── */}

      </div>
    </div>
  )
}
