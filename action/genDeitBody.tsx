import { DietData } from "@/define/types";


export function genDeitBody(data: DietData): object {


  function chooseMealStyle(weightKg: number, bodyFatPct: number, activity: 1 | 2 | 3): String[] {
    let diet: String[] = [];

    const f = bodyFatPct / 100;
    const leanMassKg = weightKg * (1 - f);      // kg fat-free mass
    const workLoad = leanMassKg * activity;

    if (bodyFatPct >= 25) diet.push("LOW_CARB");
    if (bodyFatPct <= 15) diet.push("LOW_FAT");
    if (workLoad >= 120) diet.push("HIGH_PROTEIN");
    if (workLoad <= 120 || (bodyFatPct >= 15 && bodyFatPct <= 25)) diet.push("HIGH_FIBER");
    return diet
  }
  function getcalories(activity: number, weight: number): number {
    let x;
    let y;
    switch (activity) {
      case 1:
        x = 25;
        y = 300;
      case 2:
        x = 30;

        y = 500;
      case 3:
        x = 35;
        y = 700;
      default:
        x = 30;
        y = 500;
    }
    return (weight * x) - y;
  }


  return {
    "size": 7,
    "plan": {
      "accept": {
        "all": [
          {
            "health": data.vegan
              ? ["VEGAN"]
              : []
          },
          {
            "diet": chooseMealStyle(data.weight, data.fats, data.activity)
          }
        ]

      },
      "fit": {
        "ENERC_KCAL": {
          "min": getcalories(data.activity, data.weight) - 200,
          "max": getcalories(data.activity, data.weight) + 200
        }
      },
      "sections": {
        "Breakfast": {
          "accept": {
            "all": [
              {
                "dish": data.breakfast
              },
              {
                "meal": [
                  "breakfast"
                ]
              }
            ]
          },
          "fit": {
            "ENERC_KCAL": {}
          }
        },
        "Lunch": {
          "accept": {
            "all": [
              {
                "dish": data.lunch
              },
              {
                "meal": [
                  "lunch/dinner"
                ]
              }
            ]
          },
          "fit": {
            "ENERC_KCAL": {}
          }
        },
        "Dinner": {
          "accept": {
            "all": [
              {
                "dish": data.dinner
              },
              {
                "meal": [
                  "lunch/dinner"
                ]
              }
            ]
          },
          "fit": {
            "ENERC_KCAL": {}
          }
        }
      }
    }
  }
}

