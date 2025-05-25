"use server"

import { value } from "../home/directory/page";


export async function fetchExcersices(values: value) {
  let muscles = values.Muscles.join("%2C")
  let equipment = values.Equipment.join("%2C")
  let difficulty = values.Difficulty.join("%2C")
  try {
    const res = await fetch(`https://musclewiki.com/newapi/exercise/exercises/directory/?${muscles && `muscles=${muscles}`}${equipment && `equipment=${equipment}`}${difficulty && `difficulty=${difficulty}`}`, {
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


