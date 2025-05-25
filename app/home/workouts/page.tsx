// "use client"
// import { getDeitPlan } from '@/app/lib/deit'
// import Tabs from '@/components/ui/tabs'
// import Link from 'next/link'
// import React, { useCallback, useEffect, useState } from 'react'
// import workoutCard from '@/components/workoutCard';
// import WorkoutCard from '@/components/workoutCard'
// import PlusGenerate from '@/components/plusGenerate'
// import { getAllAiPlans } from '@/app/lib/workout'
// import Load from '@/components/load'
// import Workouts from '@/components/workouts'
// import DropMenu from '@/components/uis/dropMenu'

// export default function page() {
//   const [activeTab, setActiveTab] = useState<number>(0);
//   const [aiGenerator, setAiGenerator] = useState<string[]>([])
//   const [loading, setloading] = useState(true)



//   useEffect(() => {
//     const fetchData = async () => {
//       let all = await getAllAiPlans();
//       console.log(all)
//       setAiGenerator(all || []);
//     };
//     fetchData();
//     setloading(false)
//   }, [])
//   let allplans = () => {
//     let cards = []
//     for (let i = 0; i < aiGenerator.length; i++) {
//       cards.push(
//         <div
//           key={i}
//           className='rounded-2xl'
//           onClick={() => window.location.href = `/generatedWorkout/${aiGenerator[i]}`}>
//           <WorkoutCard id={Number(i + 1)} />
//         </div>
//       )
//     }
//     return cards
//   }

//   if (loading) return <Load />

//   return (
//     <div className='flex justify-center items-center'>
//       <Tabs
//         classCss="absolute top-[10px] left-[10px]"
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />

//       {activeTab === 1 &&

//           <Workouts />
//       }

//       {activeTab === 0 &&
//         <>
//           {aiGenerator.length > 0
//             ?
//             (<div className=' absolute top-[70px] h-[83%] w-full flex flex-wrap gap-[10px] p-[10px]'>
//               {allplans().map((card) => card)}
//               <PlusGenerate />
//             </div>)
//             :
//             <div>button</div>
//           }
//         </>
//       }
//     </div>
//   )
// }

"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Tabs from '@/components/ui/tabs';
import WorkoutCard from '@/components/workoutCard';
import PlusGenerate from '@/components/plusGenerate';
import { getAllAiPlans } from '@/app/lib/workout';
import Load from '@/components/load';
import Workouts from '@/components/workouts';
import CreateBtn from '@/components/CreateBtn';

export default function Page() {

  const [activeTab, setActiveTab] = useState<number>(0);
  const [aiPlans, setAiPlans] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPlans() {
      try {
        const plans = await getAllAiPlans();
        setAiPlans(plans ?? []);
      } catch (err) {
        console.error('Failed to fetch AI plans', err);
        setAiPlans([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const aiPlanCards = useMemo(
    () => aiPlans.map((planId, idx) => (
      <div
        key={planId}
        className="rounded-2xl cursor-pointer"
        onClick={() => router.push(`/generatedWorkout/${planId}`)}
      >
        <WorkoutCard id={idx + 1} />
      </div>
    )),
    [aiPlans, router]
  );

  if (loading) return <Load />;

  return (
    <div className="flex justify-center items-center relative bg-gradient-to-br from-[#ffffff] to-[#0F4C75]">
      <Tabs
        classCss="absolute top-2 left-2"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 0 && (
        <>
          {aiPlans.length > 0
            ?
            (
              <div className="absolute top-[70px] h-[83%] w-full flex flex-wrap gap-[10px] p-[10px]">
                {aiPlanCards}
                <PlusGenerate />
              </div>
            )
            :
            <CreateBtn />
          }
        </>
      )}
        {activeTab === 1 && <Workouts />}
    </div>
  );
}
