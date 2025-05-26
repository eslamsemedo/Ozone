"use client"
import { checkPlanAndExpiration, deletePlan, getDayMeals, getDays } from '@/app/lib/deit';
import MealDeteil from '@/components/mealDeteil';
import { X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link';
import Load from '@/components/load';
import MagicBtn from '@/components/magicBtn';
import { useRouter } from 'next/navigation';
import BackBtn from '@/components/backBtn';
import CreateBtn from '@/components/CreateBtn';

export default function page() {
  interface WeekDay {
    day: string;
    date: string;
  }

  const [selectedRecipe, setSelectedRecipe] = useState<any>();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [hasPlan, setHasPlan] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Day, setDay] = useState<number>(-1);
  const router = useRouter();

  const [weekDays, setWeekDays] = useState<WeekDay[]>([])

  Date.now()
  // const today = new Date().toISOString().split('T')[0];
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => {
    // console.log(weekDays[0]?.day);
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let expired = await checkPlanAndExpiration();
        // if expired or no plan
        if (expired) {
          setRecipes([]);
          return;
        }

        setHasPlan(true);

        const daysPlan = await getDays();
        setWeekDays(Array.isArray(daysPlan) ? daysPlan : []);


        if (Day > -1) {
          const data = await getDayMeals(
            Day
          );
          setRecipes(data ?? []);
        }

      } catch (err) {
        console.error("Error fetching meals", err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [Day]);

  // Handler for recipe click
  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  // Handler for closing recipe details
  const handleCloseDetails = () => {
    setSelectedRecipe(null);
  };
  const reGeneratePlan = async () => {
    await deletePlan()

  }


  if (loading) return <Load />;



  if (!hasPlan) {
    return (
      // <MagicBtn setter={setDay} />
      <CreateBtn herf="/generateDeitPlan"/>
    );
  }

  if (Day <= -1) {
    return (
      
      <div
        className="h-full flex flex-col justify-center items-center text-[#6c94d9] bg-gradient-to-br from-[#000000] to-[#0F4C75]  font-sans rounded-3xl "
        // style={{ background: "radial-gradient(circle, #0F4C75, #000000)" }}
      >
        <Link href="/generateDeitPlan">
          <button
            onClick={() => reGeneratePlan()}
            className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Re-generate
          </button>
        </Link>


        <h1
          className="text-[2rem] sm:text-[3rem] md:text-[3rem] text-[#BBE1FA] italic mb-[15px] sm:mb-[10px] font-[cursive]">
          YOUR WEEK PLAN
        </h1>
        {/* First week row */}
        <div className="flex flex-wrap mt-[20px] gap-[10px] md:gap-[20px] justify-center items-center lg:pr-32 lg:pl-32">
          {
            weekDays.map((day, index) => (
              // console.log(day.date, "===", today, "===", day.day)
              <div key={index} onClick={() => setDay(index +1 )} className="cursor-pointer">
                {
                  today == day.date ?
                    <div className="no-underline block">
                      <div className="bg-[#0F4C75] p-5 w-[100px] h-[100px] md:w-[150px] md:h-auto text-center rounded-[30px] text-[2rem] shadow-md transition-transform duration-200 ease-in-out relative z-[1] hover:-translate-y-[5px]">
                        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-[#3b409a] text-[rgb(183,181,181)] px-[10px] py-[5px] rounded-[10px] text-[1.3rem] font-bold">
                          <label className="cursor-pointer">Today</label>
                        </div>
                        <p className="my-[5px] text-[20px] italic text-[#BBE1FA]  transition-all duration-300">
                          {day.day}
                        </p>
                        <p className="my-[5px] text-[0.9rem] text-[#000000] font-bold transition-all duration-300">
                          {day.date}
                        </p>
                      </div>
                    </div>
                    :
                    <div
                      key={index} className="bg-[#195882] p-5 w-auto h-[100px] md:w-[150px] md:h-auto text-center rounded-[30px] text-[2rem] shadow-md transition-transform duration-200 ease-in-out relative z-[1] hover:-translate-y-[5px]">
                      <p className="my-[5px] text-[20px] italic text-[#BBE1FA]  transition-all duration-300">
                        {day.day}
                      </p>
                      <p className="my-[5px] text-[0.9rem] text-[#000000] font-bold transition-all duration-300">
                        {day.date}
                      </p>
                    </div>
                }
              </div>
            ))
          }
        </div>
      </div>

    );
  }

  return (
    <>
      {!selectedRecipe && (
        <div className=" w-[100%] h-full bg-[#0F4C75] p-20 rounded-2xl backdrop-blur-sm shadow-lg flex justify-center flex-col gap-8 z-10 animate-[fadeIn_1s_ease-out]">
          <div className="absolute top-4 left-4">
            <BackBtn onClick={()=>setDay(-1)} />
          </div>
          {recipes.map((recipe, i) => (
            <div
              key={i}
              className="flex-auto flex-col min-h-[150px] bg-white/[0.027] rounded-xl p-5 text-center cursor-pointer relative overflow-hidden backdrop-blur-sm flex justify-center items-center transition-transform duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl"
              onClick={() => handleRecipeClick(recipe)}
            >
              {/* <div className="absolute inset-0 bg-gradient-radial from-blue-100/30 to-transparent opacity-0 pointer-events-none scale-150 -translate-x-full rotate-[25deg] group-hover:animate-shine" /> */}
              <div className="text-4xl font-bold text-gray-100 tracking-widest uppercase">{recipe?.mealType}</div>
              <div className="text-xl  text-gray-400">{recipe?.label}</div>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <>
          <MealDeteil
            recipeData={{ recipe: selectedRecipe }}
            onclose={setSelectedRecipe}
          />

        </>
      )}
    </>
  )
}



