'use server';
import { genDeitBody } from "@/action/genDeitBody";
import { DietData } from "@/define/types";
import connectDB from "@/mongoDB/db";
import { deitPlan } from "@/mongoDB/models/deitPlan";
import { meals } from "@/mongoDB/models/meals";
import { currentUser } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/dist/server/api-utils";



export async function getDeitPlan(data: DietData) {
  let plan: any;
  let brId: string | null = null;
  let luId: string | null = null;
  let diId: string | null = null;
  try {
    await connectDB();

    const loginUser = await currentUser(); // get Clerk user
    if (!loginUser) return;

    if (await deitPlan.findOne({ userId: loginUser.id })) {
      return alert("You already have a plan");
    }


    let req = await fetch("https://api.edamam.com/api/meal-planner/v1/9c5b8698/select?type=public", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Edamam-Account-User": "eslamsemedo",
        "Authorization": "Basic OWM1Yjg2OTg6NTNkZTdmMmVmYzRkMmEwOTA5NGQzMDgyNTY4NGZhYjE=" // Use full token
      },
      body: JSON.stringify(genDeitBody(data))
    });
    plan = await req.json();
    // create Plan in DB
    let fullPlan = await deitPlan.create({
      userId: loginUser.id,
    })
    let planid = fullPlan._id.toString();


    const queryParams = new URLSearchParams({
      type: "public",
      app_id: "9c5b8698",
      app_key: "53de7f2efc4d2a09094d30825684fab1"
    }).toString();

    // await each in series (or switch to Promise.all if you prefer parallel)
    for (let i = 0; i < plan.selection.length; i++) {
      const sel = plan.selection[i];
      const secs = sel.sections as {
        Breakfast: any;
        Lunch: any;
        Dinner: any;
      };

      try {
        // Breakfast
        const brRes = await fetch(
          `${secs.Breakfast._links.self.href}?${queryParams}`,
          { headers: { "Edamam-Account-User": "eslamsemedo" } }
        );
        secs.Breakfast = await brRes.json();
        const breakfastMeal = await meals.create({ recipe: secs.Breakfast.recipe, mealType: "Breakfast" });
        brId = breakfastMeal._id.toString();

        // Lunch
        const luRes = await fetch(
          `${secs.Lunch._links.self.href}?${queryParams}`,
          { headers: { "Edamam-Account-User": "eslamsemedo" } }
        );
        secs.Lunch = await luRes.json();
        const lunchMeal = await meals.create({ recipe: secs.Lunch.recipe, mealType: "Lunch" });
        luId = lunchMeal._id.toString();

        // Dinner
        const diRes = await fetch(
          `${secs.Dinner._links.self.href}?${queryParams}`,
          { headers: { "Edamam-Account-User": "eslamsemedo" } }
        );
        secs.Dinner = await diRes.json();
        const dinnerMeal = await meals.create({ recipe: secs.Dinner.recipe, mealType: "Dinner" });
        diId = dinnerMeal._id.toString();

      } catch (err) {
        console.error("Error fetching meal details for day", i, err);
      }
      // update the plan with the meal ids
      await deitPlan.findByIdAndUpdate(planid, {
        [`day_${i + 1}`]: {
          breakfastId: brId,
          lunchId: luId,
          dinnerId: diId,
        }
      })
    }
  } catch (error) {
    alert(`the error:${error}`);
  }
}


export async function getDayMeals(dayNumber: number) {


  try {
    await connectDB();
    let day = `day_${dayNumber}`;

    const loginUser = await currentUser();
    if (!loginUser) return [null, null, null];
    const dayPlan: any = await deitPlan.findOne({ userId: loginUser.id });
    if (!dayPlan) return [null, null, null];

    const breakfast = await meals.findById(dayPlan[day]?.breakfastId);
    const lunch = await meals.findById(dayPlan[day]?.lunchId);
    const dinner = await meals.findById(dayPlan[day]?.dinnerId);

    return [
      breakfast?.recipe ?? null,
      lunch?.recipe ?? null,
      dinner?.recipe ?? null
    ];
  } catch (error) {
    console.error("Error fetching day meals:", error);
    return [null, null, null];
  }
}



export async function getDays() {
  try {
    await connectDB();

    const user = await currentUser();          // Clerk user
    if (!user) return false;                   // not signed i,n

    // const plan = await deitPlan.findOne({ userId: user.id });
    const plan = await deitPlan.findOne({ userId: user.id });

    const startDate = plan?.createdAt || new Date();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const weekArray = [];

    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);

      const dayName = daysOfWeek[nextDate.getDay()];
      const formattedDate = nextDate.toISOString().split('T')[0]; // YYYY-MM-DD

      weekArray.push({
        day: dayName,
        date: formattedDate
      });
    }
    return weekArray;
  } catch (err) {
    console.error("get Week failed:", err);
    throw err;                                 // or return false; based on your needs
  }
}

export async function deletePlan() {
  try {
    const user = await currentUser();          // Clerk user
    if (!user) return false;

    const plan = await deitPlan.findOne({ userId: user.id });
    if (!plan) return false;
    // delete meals
    for (let i = 1; i <= 7; i++) {
      const day = `day_${i}` as keyof typeof plan;
      const breakfastId = plan[day]?.breakfastId;
      const lunchId = plan[day]?.lunchId;
      const dinnerId = plan[day]?.dinnerId;

      if (breakfastId) {
        await meals.findByIdAndDelete(breakfastId);
      }
      if (lunchId) {
        await meals.findByIdAndDelete(lunchId);
      }
      if (dinnerId) {
        await meals.findByIdAndDelete(dinnerId);
      }
    }
    await deitPlan.deleteOne({ userId: user.id });
    // revalidatePath("/home/nutrition");
  } catch (err) {
    console.error("checkUserPlan failed:", err);
    throw err;                                 // or return false; based on your needs
  }
}

export async function checkPlanAndExpiration() {
  try {
    await connectDB();

    const user = await currentUser();          // Clerk user
    if (!user) return false;                   // not signed i,n

    const plan = await deitPlan.exists({ userId: user.id }).lean().exec();
    if (!Boolean(plan)) return true;                   // no plan found or something else

    const lastDay = (plan?.createdAt ? new Date(plan.createdAt) : new Date());
    lastDay.setDate(lastDay.getDate() + 8); // add 7 days to the start date
    const currentDate = new Date();

    if (currentDate.toISOString().split('T')[0] <= lastDay.toISOString().split('T')[0]) {
      return false // plan is still valid
    } else {
      await deletePlan()
      return true // plan is expired
    }
  } catch (err) {
    console.error("get Week failed:", err);
    throw err;                                 // or return false; based on your needs
  }
}
