"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  VenusAndMars,
  Cake,
  Trophy,
  Zap,
  Dumbbell,
  HeartPulse,
} from 'lucide-react';
import { Slider } from "@/components/ui/slider"
import WorkoutDisplay from "@/components/workout-display";
import { generateWorkoutPlan } from "../lib/workout";
import { useRouter } from 'next/navigation'
import { NumberInput } from "../generateDeitPlan/page";
import { equipmentMap, muscles } from "../home/directory/page";
// import { getWorkoutPlan } from "../lib/workout";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export const equipmentArray: readonly { name: string; id: number; icon: React.ReactNode }[] = [
  { name: 'Barbell', id: 1, icon: <VenusAndMars /> },
  { name: 'Dumbbells', id: 2, icon: <VenusAndMars /> },
  { name: 'Bodyweight', id: 3, icon: <VenusAndMars /> },
  { name: 'Machine', id: 4, icon: <VenusAndMars /> },
  { name: 'Kettlebells', id: 7, icon: <VenusAndMars /> },
  { name: 'Cables', id: 9, icon: <VenusAndMars /> },
  { name: 'Band', id: 10, icon: <VenusAndMars /> }
];

export const musclesArray: { [key: number]: string } = {
  1: "Biceps",
  2: "Chest",
  3: "Quads",
  4: "Traps",
  5: "Triceps",
  6: "Shoulders",
  7: "Lats",
  8: "Hamstrings",
  9: "Glutes",
  10: "Forearms",
  11: "Calves",
  12: "Abdominals",
  13: "Lower back",
  14: "Traps (mid-back)",
  15: "Obliques",
  47: "Front Shoulders",
  48: "Rear Shoulders",
  49: "Neck"
}
// export const equipmentMap = {
//   1: "Barbell",
//   2: "Dumbbells",
//   3: "Bodyweight",
//   4: "Machine",
//   6: "Medicine-Ball",
//   7: "Kettlebells",
//   8: "Stretches",
//   9: "Cables",
//   10: "Band",
//   11: "Plate",
//   12: "TRX",
//   13: "Yoga",
//   24: "Bosu-Ball",
//   26: "Vitruvian",
//   27: "Cardio",
//   85: "Smith-Machine",
//   105: "Recovery"
// };

export const steps: readonly { id: number; icon: React.ReactNode }[] = [
  { id: 1, icon: <VenusAndMars /> },
  { id: 2, icon: <Cake /> },
  { id: 3, icon: <Trophy /> },
  { id: 4, icon: <Zap /> },
  { id: 5, icon: <Dumbbell /> },
  { id: 6, icon: <HeartPulse /> },
  { id: 7, icon: <HeartPulse /> }
];

export default function page() {

  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<"M" | "F">();
  const [age, setAge] = useState<number>(20);
  const [goal, setGoal] = useState<1 | 2 | 3>();
  const [fitLevel, setFitLevel] = useState<1 | 2 | 3 | 4>();
  const [equipment, setEquipment] = useState<number[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(age);
  }, [age]);

  const router = useRouter();

  const totalSteps = steps.length;

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps));
  }, [totalSteps]);

  const back = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
  }, []);


  /** ----- Finish Handler ----- */
  const submit = async () => {
    if (!gender || !goal || !fitLevel || equipment.length === 0) {
      // toast.error("Please complete all steps before proceeding.");
      return;
    }
    setLoading(true)
    let muscles_id_list = selectedMuscles
    let equipment_id_list = equipment


    let id = await generateWorkoutPlan({
      gender,
      age,
      goal,
      fitLevel,
      equipment_id_list,
      muscles_id_list
    })
    // let id = await generateWorkoutPlan()

    router.push(`/generatedWorkout/${id}`);

    // routeModule.push("/")
    // let data = await getWorkoutPlan()
    // console.dir(data, {depth : 0});

    setLoading(false)

  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white  ">
      <span className="text-2xl animate-pulse tracking-widest flex flex-col items-center gap-4">


        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2269d4]"></div> */}
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
        <span className=''>Generating</span>
      </span>
    </div>
  )


  const RenderStepContent = memo(() => {
    switch (step) {
      case 1:
        return (
          <>
            <h1 className=" text-3xl md:text-4xl  font-bold text-white opacity-80 h-[30%] mt-8 flex items-center justify-between">LETS GET STARTED</h1>
            <div className="flex flex-col items-center justify-center overflow-visible w-full gap-7 h-[70%]">
              {['MALE', 'FEMALE'].map((Gender, i) => (
                <button
                  key={i}
                  className={`px-10 py-4 h-[70px] max-[350px]:w-[250px] w-[350px] rounded-3xl backdrop-blur-md text-black ${gender === Gender.charAt(0)
                    ? 'bg-[#8e8e8e] bg-opacity-20 border-2 border-blue-400'
                    : 'bg-white bg-opacity-10 border-2 border-transparent'
                    } transition-all duration-200 hover:scale-110 hover:bg-[#8e8e8e] hover:bg-opacity-20 hover:border-2 hover:border-blue-400`}
                  onClick={() => {
                    setGender(Gender == 'MALE' ? 'M' : 'F')
                    next()
                  }
                  }
                >
                  <span className="font-semibold tracking-wider">{Gender}</span>
                </button>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h1 className=" text-3xl md:text-4xl  font-bold text-white opacity-80 h-[30%] mt-8 flex items-center justify-between">YOUR AGE {age}</h1>
            {/* <Slider
              className=" w-[60%] md:w-[50%] h-[70%]"
              value={[age]}
              max={60}
              step={1}
              onValueChange={(v) => setAge(v[0])}
            /> */}

            <NumberInput
              label=""
              unit=""
              value={age}
              onChange={setAge}
            />
            {/* <input
                type="range"
                id="height"
                className="w-[60%] md:w-[50%] h-[70%] rounded bg-[rgba(255,255,255,0.1)] outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4a80f5] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(56,103,214,0.7)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                min="1"
                max="60"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
              /> */}
          </>
        );
      case 3:
        return (
          <>
            <h1 className=" text-3xl md:text-4xl  font-bold text-white opacity-80 h-[30%] mt-8 flex items-center justify-between">YOUR FITNESS GOAL</h1>
            <div className="flex flex-col items-center justify-center overflow-visible w-full gap-6 h-[70%]">
              {['Lose Weight', 'Gain Strength', "Gain Muscle"].map((g, i) => (
                <button
                  key={i}
                  className={`px-10 py-4 h-[70px] max-[350px]:w-[250px] w-[350px] rounded-3xl backdrop-blur-md text-black ${goal === (Number(i) + 1)
                    ? 'bg-[#8e8e8e] bg-opacity-20 border-2 border-blue-400'
                    : 'bg-white bg-opacity-10 border-2 border-transparent'
                    } transition-all duration-200 hover:scale-110 hover:bg-[#8e8e8e] hover:bg-opacity-20 hover:border-2 hover:border-blue-400`}
                  onClick={() => {
                    setGoal((Number(i) + 1) as 1 | 2 | 3)
                    next()
                  }}
                >
                  <span className="font-semibold tracking-wider">{g}</span>
                </button>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h1 className=" text-3xl md:text-4xl  font-bold text-white opacity-80 h-[30%] mt-8 flex items-center justify-between">YOUR FITNESS LEVEL</h1>
            <div className="flex flex-col items-center justify-center overflow-visible w-full gap-6 h-[70%]">
              {['Beginner', 'Intermediate', 'Advanced', 'Novice'].map((level, i) => (
                <button
                  key={i}
                  className={`px-10 py-4 h-[70px] max-[350px]:w-[250px] w-[350px] rounded-3xl backdrop-blur-md text-black ${fitLevel === (Number(i) + 1)
                    ? 'bg-[#8e8e8e] bg-opacity-20 border-2 border-blue-400'
                    : 'bg-white bg-opacity-10 border-2 border-transparent'
                    } transition-all duration-200 hover:scale-110 hover:bg-[#8e8e8e] hover:bg-opacity-20 hover:border-2 hover:border-blue-400`}
                  onClick={() => {
                    setFitLevel((Number(i) + 1) as 1 | 2 | 3 | 4)
                    next()
                  }}
                >
                  <span className="font-semibold tracking-wider">{level}</span>
                </button>
              ))}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h1 className=" text-3xl md:text-4xl  font-bold text-white opacity-80 h-[30%] mt-8 flex items-center justify-between">YOUR FITNESS GOAL?</h1>
            <div className="flex flex-wrap items-center justify-center w-[100%] gap-3.5 md:gap-6 h-[70%]">
              <button
                className={`h-[70px]  rounded-3xl backdrop-blur-md text-black ${equipment.length === 7
                  ? 'bg-[#8e8e8e] bg-opacity-20 border-2 border-blue-400'
                  : 'bg-white bg-opacity-10 border-2 border-transparent'
                  } transition-all duration-200 hover:scale-110 hover:bg-[#8e8e8e] hover:bg-opacity-20 hover:border-2 hover:border-blue-400
                    basis-1/3 text-center`}
                onClick={() => setEquipment(equipmentArray.map(item => item.id))}
              >
                <span className="tracking-wider text-[15px] font-bold flex flex-wrap items-center justify-center">Select All</span>
              </button>
              {equipmentArray.map((equip, i) => (
                <button
                  key={i}
                  className={`h-[70px]  rounded-3xl backdrop-blur-md text-black ${equipment.includes(equip.id)
                    ? 'bg-[#8e8e8e] bg-opacity-20 border-2 border-blue-400'
                    : 'bg-white bg-opacity-10 border-2 border-transparent'
                    } transition-all duration-200 hover:scale-110 hover:bg-[#8e8e8e] hover:bg-opacity-20 hover:border-2 hover:border-blue-400
                    basis-1/3 text-center`}
                  onClick={() => {
                    if (equipment.includes(equip.id)) {
                      setEquipment(equipment.filter((eq) => eq !== equip.id));
                    }
                    else {
                      setEquipment([...equipment, equip.id]);
                    }
                  }}
                >
                  {equip.icon && (
                    <div className=" hidden md:flex items-center justify-center mb-2">
                      {equip.icon}
                    </div>
                  )}
                  <span className="tracking-wider text-[15px] font-bold flex flex-wrap items-center justify-center">{equip.name}</span>
                </button>
              ))}
            </div>
          </>
        );

      case 6:
        return (
          <>
            <h1 className="text-3xl font-bold text-white opacity-80 mb-6">Select Target Muscles</h1>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                className={`px-4 py-2 rounded-lg backdrop-blur-md text-black ${selectedMuscles.length === Object.keys(musclesArray).length
                  ? 'bg-[#8e8e8e] bg-opacity-20 border-2 border-blue-400'
                  : 'bg-white bg-opacity-10 border-2 border-transparent'}`}
                onClick={() => setSelectedMuscles(Object.keys(musclesArray).map(k => Number(k)))}
              >
                Select All
              </button>
              {Object.entries(musclesArray).map(([key, name]) => (
                <button
                  key={key}
                  className={`px-4 py-2 rounded-lg backdrop-blur-md text-black ${selectedMuscles.includes(Number(key))
                    ? 'bg-[#8e8e8e] bg-opacity-20 border-2 border-blue-400'
                    : 'bg-white bg-opacity-10 border-2 border-transparent'}`}
                  onClick={() => {
                    const idNum = Number(key);
                    setSelectedMuscles(selectedMuscles.includes(idNum)
                      ? selectedMuscles.filter(id => id !== idNum)
                      : [...selectedMuscles, idNum]
                    );
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </>
        );
      case 7:
        return (
          <>
            <h1 className="text-4xl font-bold text-white opacity-80 h-[40%] mt-8 flex items-center justify-between">ALL SET!</h1>
            <div className="flex flex-col overflow-visible w-[23%] gap-6 h-[60%]">
              <p className="text-xl mb-4">Your profile is ready:</p>
              <p>Gender: {gender}</p>
              <p>age: {age} years</p>
              <p>fitness Level: {fitLevel}</p>
              <p>Goal: {goal}</p>
              <p>Equipment: {equipment.map((eq) => equipmentArray.find(e => e.id === eq)?.name).join(', ')}</p>
              <p>Target Muscles: {selectedMuscles.map((id: number) => musclesArray[id]).join(', ')}</p>
            </div>
          </>
        );
      default:
        return null;
    }
  })

  const MemoizedBtnContent = memo(() => (
    <div className="w-full max-w-lg flex gap-4 mt-auto p-4">
      {step > 1 && (
        <button
          onClick={back}
          className="py-4 px-8 rounded-xl font-semibold bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
        >
          BACK
        </button>
      )}
      <button
        onClick={step === totalSteps ? submit : next}
        className={`w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-shadow duration-300 `}
      >
        {step === totalSteps ? 'GET STARTED' : 'NEXT'}
      </button>
    </div>
  ));

  return (
    <>
      <div className="flex flex-col items-center w-full h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white py-7 sm:p-7">
        {/* Progress Steps */}
        <div className="w-full flex items-center justify-center h-[10%]">
          <div className=" rounded-full w-[90%] ">
            <div>
              <div className="mt-2 relative">
                <div className="overflow-hidden rounded-full bg-gray-300">
                  <div className="h-2 rounded-full bg-blue-500 duration-300" style={{ width: `${(step - 1) * (100 / (steps.length - 1))}%` }}>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center absolute -top-4 md:-top-7 left-0 w-full">

                  {steps.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${s.id <= step
                        ? "bg-[#1d4ba8]"
                        : "bg-white"} flex justify-center items-center w-[40px] h-[40px] md:w-[65px] md:h-[65px] rounded-full duration-500 bg-mw-blue text-[#000] text-[30px] text-center font-bold`}
                      onClick={() => setStep(s.id)}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center w-full h-[70%]">
          <RenderStepContent />
        </div>

        {/* Navigation Buttons */}
        <MemoizedBtnContent />
      </div>
      {/* <WorkoutDisplay /> */}
    </>
  );
}
