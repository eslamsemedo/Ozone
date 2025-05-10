"use client"
import { getDeitPlan } from '@/app/lib/deit'
import Tabs from '@/components/ui/tabs'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import workoutCard from '@/components/workoutCard';
import WorkoutCard from '@/components/workoutCard'
import PlusGenerate from '@/components/plusGenerate'
import { getAllAiPlans } from '@/app/lib/workout'
import Load from '@/components/load'
import Workouts from '@/components/workouts'
import DropMenu from '@/components/uis/dropMenu'

export default function page() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [aiGenerator, setAiGenerator] = useState<string[]>([])
  const [loading, setloading] = useState(true)



  useEffect(() => {
    const fetchData = async () => {
      let all = await getAllAiPlans();
      console.log(all)
      setAiGenerator(all || []);
    };
    fetchData();
    setloading(false)
  }, [])
  let allplans = () => {
    let cards = []
    for (let i = 0; i < aiGenerator.length; i++) {
      cards.push(
        <div
          key={i}
          onClick={() => window.location.href = `/generatedWorkout/${aiGenerator[i]}`}>
          <WorkoutCard />
        </div>
      )
    }
    return cards
  }

  if (loading) return <Load />

  return (
    <>
      <Tabs
        classCss="absolute top-[10px] left-[10px]"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 1 &&
        
          <Workouts />
      }

      {activeTab === 0 &&
        <>
          {2 > 0
            ?
            (<div className='h-[83%] w-full flex flex-wrap gap-[10px] relative p-[10px]'>
              {allplans().map((card) => card)}
              <PlusGenerate />
            </div>)
            :
            <div>button</div>
          }
        </>
      }
    </>
  )
}
