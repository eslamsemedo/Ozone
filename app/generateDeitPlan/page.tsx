"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';
import { getDeitPlan } from '../lib/deit';
import { DietData } from '@/define/types';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation'

const foodCategories = [
  "Alcohol cocktail",
  "Biscuits and cookies",
  "Bread",
  "Cereals",
  "Condiments and sauces",
  "Desserts",
  "Drinks",
  "Egg",
  "Ice cream and custard",
  "Main course",
  "Pancake",
  "Pasta",
  "Pastry",
  "Pies and tarts",
  "Pizza",
  "Preps",
  "Preserve",
  "Salad",
  "Sandwiches",
  "Seafood",
  "Side dish",
  "Soup",
  "Special occasions",
  "Starter",
  "Sweets"
];

export default function Page() {
  const [step, setStep] = useState(1)
  const [breakfast, setBreakfast] = useState<string[]>([])
  const [lunch, setLunch] = useState<string[]>([])
  const [dinner, setDinner] = useState<string[]>([])
  const [weight, setWeight] = useState<number>(77)
  const [fats, setFats] = useState<number>(10)
  const [activity, setActivity] = useState<1 | 2 | 3>(1)
  const router = useRouter();
  const [loading, setLoading] = useState(false)



  const prev = () => setStep(s => Math.max(1, s - 1))
  const next = () => setStep(s => Math.min(6, s + 1))
  // submit function
  const submit = async () => {
    setLoading(true);

    await getDeitPlan({ breakfast, lunch, dinner, weight, fats, activity, vegan: false } as DietData)
    // revalidatePath('/home/nutrition')
    // router.push('/home');                 // go away first
    router.push('/home/nutrition');
    // window.location.href = '/home/nutrition';
    // window.location.href = '/home/nutrition';
    // await fetch('/api/revalidate', { method: 'POST' });
  }

  // decide which slice & setter to hand down
  const selected = step === 1 ? breakfast : step === 2 ? lunch : dinner
  const setSelected =
    step === 1 ? setBreakfast :
      step === 2 ? setLunch :
        setDinner

  // if (loading) return <Load />;
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

  return (
    <div className="bg-black text-white font-medium min-h-screen flex flex-col items-center w-full">
      {/* <button
        //  onClick={submit}
        className="mt-4">
        Log Meals
      </button> */}

      {/* Header Dials */}
      <header className="grid grid-cols-6 gap-4 w-[90%] mx-auto mt-7 max-[600px]:mt-3.5">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={
              `w-[75px] h-[75px] max-[600px]:w-[50px] max-[600px]:h-[50px] m-auto rounded-full text-white bg-[#2D2D2F] border border-gray-700 cursor-pointer transition-all duration-300 ease-in-out ` +
              (i === step
                ? 'bg-gradient-to-r from-[#2269d4] via-[#4491f5] to-[#86a8e7] shadow-[1px_1px_1px_#86a8e7]'
                : 'hover:scale-110 hover:bg-gradient-to-r hover:from-[#2269d4] hover:via-[#4491f5] hover:to-[#86a8e7] hover:shadow-md')
            }
          >
            {i}
          </button>
        ))}
      </header>

      {/* Only steps 1–3 show food choices */}
      {[1, 2, 3].includes(step) && (
        <Meals
          eat={step}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {[4].includes(step) && (
        <NumberInput
          label="Weight (kg)"
          unit="kg"
          value={weight}
          onChange={setWeight}
        />
      )}
      {[5].includes(step) && (
        <NumberInput
          label="Fats (%)"
          unit="%"
          value={fats}
          onChange={setFats}
        />
      )}
      {[6].includes(step) && (

        <OptionInput
          label="Activity Level"
          unit=""
          value={activity}
          onChange={setActivity}
        />
      )}

      {/* Prev / Next */}
      <div className="mt-auto w-full flex max-[600px]:flex-col items-center justify-between p-5 gap-2">
        <button
          onClick={prev}
          className="w-[210px] max-[600px]:w-[80%] h-[60px] text-xl text-white bg-[#2D2D2F] border-gray-700 border rounded-lg hover:scale-105 transition"
        >
          Previous
        </button>

        {step >= 6
          ? (
            <button
              onClick={submit}
              className="w-[210px] max-[600px]:w-[80%] h-[60px] text-xl text-white bg-[#2D2D2F] border-gray-700 border rounded-lg hover:scale-105 transition"
            >
              Finish
            </button>
          )
          : (
            <button
              onClick={next}
              className="w-[210px] max-[600px]:w-[80%] h-[60px] text-xl text-white bg-[#2D2D2F] border-gray-700 border rounded-lg hover:scale-105 transition"
            >
              Next
            </button>
          )
        }
      </div>
    </div>
  )
}

function Meals({
  eat,
  selected,
  setSelected
}: {
  eat: number
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
}) {
  return (
    <>
      <section className="text-center my-5 mx-auto">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-5 bg-gradient-to-r from-[#2269d4] via-[#4491f5] to-[#86a8e7] bg-clip-text text-transparent">
          {eat === 1 ? 'Breakfast' : eat === 2 ? 'Lunch' : 'Dinner'}
        </h1>
        <p className="text-lg tracking-wide">
          To offer you the best experience we need to<br />
          know more information about you.
        </p>
      </section>

      <section className="flex flex-wrap justify-center gap-8 mx-4">
        {foodCategories.map((meal, i) => (
          <button
            key={i}
            className={
              `w-[200px] lg:w-[300px] h-[60px] text-white bg-[#2D2D2F] border border-gray-700 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 ` +
              (selected.includes(meal)
                ? 'bg-gradient-to-r from-[#2269d4] via-[#4491f5] to-[#86a8e7]'
                : 'hover:bg-gradient-to-r hover:from-[#2269d4] hover:via-[#4491f5] hover:to-[#86a8e7]')
            }
            onClick={() => {
              setSelected(prev =>
                prev.includes(meal)
                  ? prev.filter(m => m !== meal)
                  : [...prev, meal]
              )
            }}
          >
            {meal}
          </button>
        ))}
      </section>
    </>
  )
}

type NumberInputProps = {
  label: string
  unit?: string
  value: number
  onChange: (v: any) => void
}
function NumberInput({ label, unit, value, onChange }: NumberInputProps) {
  const dec = () => onChange(Math.max(0, value - 1))
  const inc = () => onChange(value + 1)

  return (
    <div className="flex flex-col items-center w-full max-w-xs h-[500px] justify-center">
      <label className="text-white font-medium mb-2">{label}</label>
      <div className="flex items-center bg-[#2D2D2F] border border-gray-700 rounded-xl py-2 px-3">
        <button
          onClick={inc}
          className="flex mr-auto items-center justify-center p-1 text-4xl text-white hover:bg-[#2269d4] rounded transition-colors"
          aria-label="Increase"
        >
          ▲
        </button>
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="mx-2 w-16 bg-transparent text-white text-3xl text-center outline-none 
          
          appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0
          focus:outline-none rounded p-2
          "
        />
        {unit && <span className="ml-2 text-white text-4xl font-medium">{unit}</span>}
        <button
          onClick={dec}
          className="flex ml-auto items-center justify-center p-1 text-4xl text-white hover:bg-[#2269d4] rounded transition-colors"
          aria-label="Decrease"
        >
          ▼
        </button>
      </div>
    </div>
  )
}
function OptionInput({ label, unit, value, onChange }: NumberInputProps) {
  // const dec = () => onChange(Math.max(0, value - 1))
  // const inc = () => onChange(value + 1)

  return (
    <div className="flex flex-col items-center w-full max-w-xs h-[500px] justify-center">
      <label className="text-white font-medium mb-2">{label}</label>
      <div className="flex items-center bg-[#2D2D2F] border border-gray-700 rounded-xl py-2 px-3">
        <Select onValueChange={(newValue) => onChange(Number(newValue))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Activity" />
          </SelectTrigger>
          <SelectContent className='bg-[#3a3a3e] text-white'>
            <SelectItem value="1" >Sedentary (little/no exercise)</SelectItem>
            <SelectItem value="2">Sedentary (little/no exercise)</SelectItem>
            <SelectItem value="3">Very Active (hard training daily)</SelectItem>
          </SelectContent>
        </Select>


        {/* {unit && <span className="ml-2 text-white text-4xl font-medium">{unit}</span>} */}
      </div>
    </div>
  )
}
