"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface showResults {
  Value: string,
  Category: string,
  Message: string
}

export default function page({ params }: { params: { calculate: string } }) {

  let [calc, setCalc] = useState<String>("")
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(0);
  const [activity, setActivity] = useState<number>(0);
  const [result, setResult] = useState<showResults>();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (showResult) {
      const resultSection = document.querySelector('.result-section');
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [showResult]);

  
  useEffect(() => {
    let fetchParam = async () => {
      let { calculate } = await params
      setCalc(calculate)
      console.log(showResult)
    }
    fetchParam()
  }, [params])

  const selectGender = (gender: string) => {
    setSelectedGender(gender);
  };

  function calcBmi() {

    const heightInMetres = height / 100;

    // BMI formula
    const bmiRaw = weight / (heightInMetres ** 2);

    // round to 1 decimal place
    const bmi = Math.round(bmiRaw * 10) / 10;

    // WHO classification
    let category: string;
    let message: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      message = 'Your BMI indicates you may be under the healthy range. \
Consider nutrient‑dense meals and consult a healthcare professional.';
    } else if (bmi < 25) {
      category = 'Normal weight';
      message = 'Great job! Maintain your weight with balanced nutrition, \
regular activity, and routine check‑ups.';
    } else if (bmi < 30) {
      category = 'Overweight';
      message = 'You’re slightly above the healthy range. \
Gradual weight loss through a calorie‑controlled diet and consistent exercise \
can improve health markers.';
    } else {
      category = 'Obesity';
      message = 'Your BMI falls in the obesity range. \
Partner with a healthcare provider to develop a tailored plan for weight \
management and overall wellness.';
    }

    return {
      Value: String(bmi),
      Category: category,
      Message: message
    }

  }

  function calcCalories() {
    const ACTIVITY_INFO = {
      1.0: { category: 'BMR only', message: 'Calories needed at complete rest.' },
      1.2: { category: 'Sedentary', message: 'Desk job or little/no exercise.' },
      1.375: { category: 'Lightly active', message: 'Light exercise 1–3 times per week.' },
      1.55: { category: 'Moderately active', message: 'Moderate exercise 4–5 times per week.' },
      1.725: { category: 'Active', message: 'Daily or intense exercise 3–4 times per week.' },
      1.9: { category: 'Very active', message: 'Intense exercise 6–7 times per week.' },
      2.2: { category: 'Extra active', message: 'Very intense exercise daily or physical job.' }
    } as const;


    const bmrRaw =
      selectedGender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const bmr = Math.round(bmrRaw);

    let TDEE
    if (activity == 2.2 && selectedGender == "female") {

      TDEE = activity - 0.2 ? Math.round(bmr * activity) : 0;
    } else {

      TDEE = activity ? Math.round(bmr * activity) : 0;
    }
    // --- Total Daily Energy Expenditure ---


    // console.log(
    //   activity,
    //   ACTIVITY_INFO[activity as keyof typeof ACTIVITY_INFO]?.category,
    //   ACTIVITY_INFO[activity as keyof typeof ACTIVITY_INFO]?.message
    // )

    return {
      Value: String(TDEE),
      Category: ACTIVITY_INFO[activity as keyof typeof ACTIVITY_INFO]?.category,
      Message: ACTIVITY_INFO[activity as keyof typeof ACTIVITY_INFO]?.message
    }


  }

  function calcProtien() {
    const PROTEIN_INFO = {
      0.8: {
        category: 'Sedentary',
        message: 'Standard intake for minimal activity to maintain basic health (0.8 g/kg).'
      },
      1.2: {
        category: 'Light Activity',
        message: 'Helps support muscle recovery for light training and general fitness.'
      },
      1.6: {
        category: 'Moderate Activity',
        message: 'Supports muscle maintenance for regular moderate-intensity workouts.'
      },
      2.0: {
        category: 'Muscle Gain',
        message: 'Optimal intake to stimulate muscle growth during strength training.'
      },
      2.4: {
        category: 'Fat Loss',
        message: 'Preserves muscle mass and promotes satiety during caloric deficits.'
      }
    } as const;

    // Optional tweaks
    let multiplier = activity;

    // a) Extra‑active females often top out at ~1.8 g/kg
    if (multiplier === 2.2 && selectedGender == 'female') {
      multiplier = 2.0;
    }

    // b) Seniors (≥ 60 y) get a bump when sedentary to offset sarcopenia
    if (multiplier === 0.9 && age >= 60) {
      multiplier = 1.0;
    }

    // ---------- 2. Total grams ----------
    const grams = multiplier && Math.round(weight * multiplier);

    // ---------- 3. Push to UI ----------

    return {
      Value: String(grams),   // e.g. "78"
      Category: PROTEIN_INFO[multiplier as keyof typeof PROTEIN_INFO]?.category,     // e.g. "Moderately active"
      Message: PROTEIN_INFO[multiplier as keyof typeof PROTEIN_INFO]?.message        // brief guideline text
    }


  }

  function handleSubmit() {
    let res
    switch (calc) {
      case "calorie-calculator":
        res = calcCalories();
        break;
      case "BMI":
        res = calcBmi();
        break;
      case "Protien": // if your route param is actually "protein", change this to "protein"
        res = calcProtien();
        break;
      default:
        console.warn(`Unknown calculation type: ${calc}`);
    }

    if (!res || !res.Value || !res.Category || !res.Message) {
      toast.error("Please check your inputs and try again.");
      setShowResult(false);
      return;
    }

    setResult(res);
    setShowResult(true);
  }


  return (
    <>
      <div className='h-full w-full'>
        <div className="relative min-h-[686px] p-8 rounded-2xl shadow-[0_0_30px_rgba(56,103,214,0.3)] bg-[rgba(17,33,65,0.7)] backdrop-blur-md border border-[rgba(56,103,214,0.3)]">
          <h1 className="text-center mb-8 text-white font-bold tracking-wide relative inline-block w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:translate-x-[-50%] after:w-20 after:h-[3px] after:bg-gradient-to-r after:from-[#4a80f5] after:to-[#1a44a7] after:rounded">
            <i className="fas fa-dumbbell mr-2"></i> {calc} Calculator
          </h1>

          <div className="mb-6 text-white">
            <label className="block mb-2 font-semibold text-[#4a80f5] items-center">
              <i className="fas fa-venus-mars mr-2"></i> Gender
            </label>
            <div className="flex gap-4">
              <div
                className={`flex-1 text-center p-3 bg-[rgba(56,103,214,0.1)] rounded-lg cursor-pointer transition-all duration-300 border border-[rgba(56,103,214,0.2)] flex flex-col items-center justify-center ${selectedGender === 'male' ? 'bg-[rgba(56,103,214,0.2)] shadow-[0_0_15px_rgba(56,103,214,0.4)] border-[rgba(56,103,214,0.5)] translate-y-[-3px]' : ''}`}
                onClick={() => selectGender('male')}
              >
                <i className="fas fa-male text-2xl mb-1"></i>
                Male
              </div>
              <div
                className={`flex-1 text-center p-3 bg-[rgba(56,103,214,0.1)] rounded-lg cursor-pointer transition-all duration-300 border border-[rgba(56,103,214,0.2)] flex flex-col items-center justify-center ${selectedGender === 'female' ? 'bg-[rgba(56,103,214,0.2)] shadow-[0_0_15px_rgba(56,103,214,0.4)] border-[rgba(56,103,214,0.5)] translate-y-[-3px]' : ''}`}
                onClick={() => selectGender('female')}
              >
                <i className="fas fa-female text-2xl mb-1"></i>
                Female
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="age" className="block mb-2 font-semibold text-[#4a80f5] items-center">
              <i className="fas fa-birthday-cake mr-2"></i> Age (years)
            </label>
            <div className="relative py-2">
              <input
                type="range"
                id="age"
                className="w-full h-[6px] rounded bg-[rgba(255,255,255,0.1)] outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4a80f5] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(56,103,214,0.7)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                min="15"
                max="80"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />
              <span className="absolute right-0 top-0 bg-[rgba(56,103,214,0.2)] py-1 px-3 rounded-full text-sm font-semibold text-white">
                {age}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="height" className="block mb-2 font-semibold text-[#4a80f5] items-center">
              <i className="fas fa-ruler-vertical mr-2"></i> Height (cm)
            </label>
            <div className="relative py-2">
              <input
                type="range"
                id="height"
                className="w-full h-[6px] rounded bg-[rgba(255,255,255,0.1)] outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4a80f5] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(56,103,214,0.7)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                min="100"
                max="250"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
              />
              <span className="absolute right-0 top-0 bg-[rgba(56,103,214,0.2)] py-1 px-3 rounded-full text-sm font-semibold text-white">
                {height} cm
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="weight" className="block mb-2 font-semibold text-[#4a80f5]  items-center">
              <i className="fas fa-weight mr-2"></i> Weight (kg)
            </label>
            <div className="relative py-2">
              <input
                type="range"
                id="weight"
                className="w-full h-[6px] rounded bg-[rgba(255,255,255,0.1)] outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4a80f5] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(56,103,214,0.7)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                min="30"
                max="200"
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
              />
              <span className="absolute right-0 top-0 bg-[rgba(56,103,214,0.2)] py-1 px-3 rounded-full text-sm font-semibold text-white">
                {weight} kg
              </span>
            </div>
          </div>
          {
            calc == "Protien" && (
              <>
                <div className="my-6">
                  <label htmlFor="activity" className="block mb-2 font-semibold text-[#4a80f5]">Activity:</label>
                  <select
                    id="protein"
                    value={activity}
                    onChange={e => setActivity(+e.target.value)}
                    className="w-full py-3 px-4 bg-[rgba(56,103,214,0.1)] border border-[rgba(56,103,214,0.3)] rounded-lg text-white font-[Poppins] text-sm outline-none appearance-none cursor-pointer shadow-[0_0_10px_rgba(56,103,214,0.2)] focus:border-[rgba(56,103,214,0.6)] focus:shadow-[0_0_15px_rgba(56,103,214,0.4)]"
                  >
                    <option value={0} disabled>Select Protein Goal</option>
                    <option value={0.8}>Sedentary (0.8 g/kg)</option>
                    <option value={1.2}>Light Activity (1.2 g/kg)</option>
                    <option value={1.6}>Moderate Activity (1.6 g/kg)</option>
                    <option value={2.0}>Muscle Gain (2.0 g/kg)</option>
                    <option value={2.4}>Fat Loss (2.4 g/kg)</option>
                  </select>
                </div>
              </>
            )
          }
          {
            calc == "calorie-calculator" && (
              <>
                <div className="my-6">
                  <label htmlFor="activity" className="block mb-2 font-semibold text-[#4a80f5]">Activity:</label>
                  <select
                    id="activity"
                    value={activity}
                    onChange={e => setActivity(+e.target.value)}
                    className="w-full py-3 px-4 bg-[rgba(56,103,214,0.1)] border border-[rgba(56,103,214,0.3)] rounded-lg text-white font-[Poppins] text-sm outline-none appearance-none cursor-pointer shadow-[0_0_10px_rgba(56,103,214,0.2)] focus:border-[rgba(56,103,214,0.6)] focus:shadow-[0_0_15px_rgba(56,103,214,0.4)]"
                  >
                    <option value={0} disabled>Select Activity Level</option>
                    <option value={1}>Basal Metabolic Rate (BMR)</option>
                    <option value={1.2}>Sedentary: little or no exercise</option>
                    <option value={1.375}>Light: exercise 1–3 times/week</option>
                    <option value={1.55}>Moderate: daily or intense exercise 3–4 times/week </option>
                    <option value={1.725}>Active: exercise 4–5 times/week </option>
                    <option value={1.9}>Very Active: intense exercise 6–7 times/week</option>
                    <option value={2.2}>Extra Active: very intense exercise daily, or physical job</option>
                  </select>
                </div>
              </>
            )
          }


          <button
            onClick={handleSubmit}
            className="block w-full py-4 bg-gradient-to-r from-[#4a80f5] to-[#1a44a7] text-white border-none rounded-lg text-base font-bold cursor-pointer transition-all duration-300 mt-8 uppercase tracking-wide shadow-[0_4px_15px_rgba(56,103,214,0.4)] hover:translate-y-[-3px] hover:shadow-[0_6px_20px_rgba(56,103,214,0.6)]"
          >
            <i className="fas fa-calculator mr-2"></i> Calculate {calc}
          </button>

          {showResult && (
            <div
              onClick={() => console.log(String(activity))}
              className="result-section mt-8 p-6 rounded-xl bg-[rgba(17,33,65,0.9)] text-center border border-[rgba(56,103,214,0.3)] shadow-[0_0_20px_rgba(56,103,214,0.2)]">
              <h2 className="mt-0 text-[#4a80f5] font-bold">
                <i className="fas fa-chart-line mr-2"></i> Your {calc} Results
              </h2>
              <div className="text-5xl font-bold my-4 text-transparent bg-clip-text bg-gradient-to-r from-[#4a80f5] to-[#1a44a7]">
                {result?.Value}
              </div>
              <div className="text-2xl mb-4 text-[#4a80f5] font-semibold">
                {result?.Category}
              </div>
              <p className='text-[#c4c4c4]'>{result?.Message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
