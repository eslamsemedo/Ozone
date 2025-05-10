"use server"
import connectDB from "@/mongoDB/db";
import { AIPlan } from "@/mongoDB/models/AIPlan";
import { User } from "@/mongoDB/models/User";
import { currentUser } from "@clerk/nextjs/server";

export async function generateWorkoutPlan() {
  let plan: any;
  try {
    await connectDB();

    const loginUser = await currentUser(); // get Clerk user
    if (!loginUser) return;

    const requestBody: any = {
      equipment_id_list: [1, 2, 3, 4, 7, 9, 10],
      muscles_id_list: [18, 5, 2, 4, 7],
      gender: "M",
      age: 21,
      fitness_level: 3,
      goal: 1,
      mobile: false,
    };


    let req = await fetch("https://musclewiki.com/newapi/workout/generator/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    plan = await req.json();

    if (plan) {
      let aiplan = await AIPlan.create({
        workoutplan: plan
      })
      console.log(aiplan._id.toString(), loginUser.id)

      await User.findOneAndUpdate({ userId: loginUser.id },
        {
          $addToSet: { workoutPlanId: aiplan._id.toString() }
        }
      )

      return aiplan._id.toString()
    }
  } catch (error) {
    console.log(`the error:${error}`);
  }
}


export async function getWorkoutPlan(id: string) {
  try {
    await connectDB();

    const loginUser = await currentUser(); // get Clerk user
    if (!loginUser) return;


    // let planid = await User.findOne({userId: loginUser.id})

    let plan = await AIPlan.findById(id)

    // console.log(plan?.workoutplan)

    return plan?.workoutplan

  } catch (error) {
    console.log(`the error:${error}`);

  }
}
export async function getAllAiPlans() {
  try {
    await connectDB();

    const loginUser = await currentUser(); // get Clerk user
    if (!loginUser) return;


    // let planid = await User.findOne({userId: loginUser.id})

    let user = await User.findOne({ userId: loginUser.id })

    // console.log(plan?.workoutplan)

    return user?.workoutPlanId

  } catch (error) {
    console.log(`the error:${error}`);

  }
}

export async function getWorkouts({
  limit = 9,
  offset = 0,
  ordering = '-weight',
  equipment = [],
  difficulty = [],
  muscles = [],
  goals = [],
}: {
  limit?: number;
  offset?: number;
  ordering?: string;
  equipment?: (number | string)[];
  difficulty?: (number | string)[];
  muscles?: (number | string)[];
  goals?: (number | string)[];
}) {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('ordering', ordering);
  if (equipment.length) params.append('equipment', equipment.join('|'));
  if (difficulty.length) params.append('difficulty', difficulty.join('|'));
  if (muscles.length) params.append('muscles', muscles.join('|'));
  if (goals.length) params.append('goals', goals.join('|')); // be sure '$goals' is actually valid!

  const url = `https://musclewiki.com/newapi/workout/originals/workouts/?${params.toString()}`;
  console.log(url)

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}

export async function fetchExcersice(slug: String) {
  try {
    const res = await fetch(`https://musclewiki.com/newapi/workout/originals/workouts/?slug=${slug}`, {
      method: "GET"
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.dir(data, {depth: true})
    return data;
    
  } catch (error) {
    console.error(error);
  };
}