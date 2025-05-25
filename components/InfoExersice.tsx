"use client"
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dumbbell, Flag, Heart, Timer, ListOrdered } from "lucide-react";
import { WorkoutItem } from '@/app/excersice/[excersice]/page';
import Image from 'next/image';



export default function InfoExersice({ obj, back }: { obj: WorkoutItem, back: React.Dispatch<React.SetStateAction<any>> }) {
  let exerciseData = obj.exercise

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [viewType, setViewType] = useState<'images' | 'video'>('images');

  const images = gender === 'male' ? exerciseData.male_images : exerciseData.female_images;
  const video = exerciseData.long_form_content.find(c => c.gender.id === (gender === 'male' ? 1 : 2))?.youtube_link;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-2xl relative">
      <button
        onClick={() => back(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        ✕
      </button>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{exerciseData.name}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          {exerciseData.grips.map(grip => (
            <Badge key={grip.id} variant="outline" className="bg-gray-100 text-gray-800">
              {grip.name} Grip
            </Badge>
          ))}
        </div>
      </header>

      <div className="space-y-8">
        {/* Media Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={gender === 'male' ? 'default' : 'outline'}
                onClick={() => setGender('male')}
                size="sm"
              >
                Male
              </Button>
              <Button
                variant={gender === 'female' ? 'default' : 'outline'}
                onClick={() => setGender('female')}
                size="sm"
              >
                Female
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewType === 'images' ? 'default' : 'outline'}
                onClick={() => setViewType('images')}
                size="sm"
              >
                Images
              </Button>
              <Button
                variant={viewType === 'video' ? 'default' : 'outline'}
                onClick={() => setViewType('video')}
                size="sm"
                disabled={!video}
              >
                Video
              </Button>
            </div>
          </div>

          {viewType === 'images' ? (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image) => (
                <div key={image.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={image.og_image}
                    alt={`Exercise view ${image.order}`}
                    width={300}   // ✅ Set appropriate width
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : video ? (
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src={video}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video w-full rounded-lg bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">No video available</p>
            </div>
          )}
        </section>

        {/* Workout Information */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Workout Information</h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2">
                  <p className="text-xs text-gray-500">Sets</p>
                  <p className="text-2xl font-bold">{obj.sets}</p>
                </div>

                <div className="text-center p-2">
                  <p className="text-xs text-gray-500">{obj.reps_or_duration === 'reps' ? 'Reps' : 'Duration'}</p>
                  <p className="text-2xl font-bold">{obj.reps_or_duration_count}</p>
                </div>

                {obj.superset && (
                  <div className="text-center p-2">
                    <p className="text-xs text-gray-500">Superset</p>
                    <div className="flex justify-center items-center">
                      <ListOrdered className="h-6 w-6 text-purple-500" />
                      <p className="text-lg font-bold ml-1">{obj.superset}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {obj.notes && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-amber-800 text-sm">{obj.notes}</p>
            </div>
          )}
        </section>

        <Separator />

        {/* Exercise Details */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Exercise Details</h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500">Difficulty</p>
                    <p className="font-medium">{exerciseData.difficulty.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500">Equipment</p>
                    <p className="font-medium">{exerciseData.category.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500">Mechanic</p>
                    <p className="font-medium">{exerciseData.mechanic.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500">Force</p>
                    <p className="font-medium">{exerciseData.force.name}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Muscle Groups */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Muscle Groups</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Primary muscles</h3>
              <div className="flex flex-wrap gap-2">
                {exerciseData.muscles_primary.map((muscle) => (
                  <span key={muscle.id} className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-purple-100 text-purple-700 border-purple-200">
                    {muscle.name}
                  </span>
                ))}
              </div>
            </div>

            {exerciseData.muscles_tertiary.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tertiary muscles</h3>
                <div className="flex flex-wrap gap-2">
                  {exerciseData.muscles_tertiary.map((muscle) => (
                    <span key={muscle.id} className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-gray-100 text-gray-700 border-gray-200">
                      {muscle.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <Separator />

        {/* Steps to perform */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">How to perform</h3>
          <ol className="space-y-3">
            {exerciseData.correct_steps.map((step) => (
              <li key={step.id} className="flex gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  {step.order}
                </div>
                <p className="text-gray-700">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}






interface ExerciseData {
  id: number;
  name: string;
  muscles: Muscle[];
  muscles_primary: Muscle[];
  muscles_secondary: Muscle[];
  muscles_tertiary: Muscle[];
  grips: Grip[];
  category: Category;
  difficulty: Difficulty;
  force: Force;
  mechanic: Mechanic;
  long_form_content: LongFormContent[];
  correct_steps: CorrectStep[];
  target_url: TargetUrl;
  male_images: Image[];
  female_images: Image[];
  full_measure: FullMeasure;
  body_map_images: BodyMapImage[];
}

interface Muscle {
  id: number;
  name: string;
  name_en_us: string;
  scientific_name: string | null;
  url_name: string;
  description: string | null;
  description_en_us: string | null;
  lft: number;
  rght: number;
  tree_id: number;
  level: number;
  parent: number | null;
}

interface Grip {
  id: number;
  name: string;
  name_en_us: string;
  description: string;
  description_en_us: string;
  url_name: string;
}

interface Category {
  id: number;
  name: string;
  name_en_us: string;
  include_in_api: boolean;
  include_in_workout_generator: boolean;
  display_order: number;
  enable: boolean;
  featured: boolean;
  image: string | null;
  mobile_icon: string | null;
  description: string | null;
}

interface Difficulty {
  id: number;
  name: string;
  name_en_us: string;
}

interface Force {
  id: number;
  name: string;
  url_name: string;
  name_en_us: string;
  description: string;
  description_en_us: string;
}

interface Mechanic {
  id: number;
  name: string;
  url_name: string;
  name_en_us: string;
  description: string;
  description_en_us: string;
}

interface LongFormContent {
  id: number;
  gender: Gender;
  youtube_link: string;
  exercise: number;
}

interface Gender {
  id: number;
  name: string;
  name_en_us: string;
}

interface CorrectStep {
  id: number;
  order: number;
  text: string;
  text_en_us: string;
  exercise: number;
}

interface TargetUrl {
  male: string;
  female: string;
}

interface Image {
  id: number;
  order: number;
  dst_link: string;
  src_image: string;
  og_image: string;
  original_video: string | null;
  unbranded_video: string | null;
  branded_video: string | null;
  gender: number;
  exercise: number;
}

interface FullMeasure {
  id: number;
  measure: Measure;
  denominator: Denominator;
  calculation_mode: CalculationMode;
}

interface Measure {
  id: number;
  units: Unit[];
  name: string;
}

interface Unit {
  id: number;
  name: string;
}

interface Denominator {
  id: number;
  units: Unit[];
  name: string;
}

interface CalculationMode {
  id: number;
  name: string;
  description: string;
}

interface BodyMapImage {
  id: number;
  gender: Gender;
  kind: string;
  dark_mode: boolean;
  front: string;
  back: string;
  exercise: number;
}

interface Obj {
  id: number;
  exercise: ExerciseData;
  superset: number;
  reps_or_duration: string;
  reps_or_duration_count: string;
  sets: string;
  sort: number;
  notes: string;
  workout: number;
}

const obj: Obj = {
  "id": 282,
  "exercise": {
    "id": 11,
    "muscles": [
      {
        "id": 9,
        "name": "Glutes",
        "name_en_us": "Glutes",
        "scientific_name": null,
        "url_name": "Glutes",
        "description": "With regard to desirability, the glutes are gaining in popularity, however the glutes are far more than something nice to look at. The gluteus maximus is the largest muscle in the body and serves many important functions.",
        "description_en_us": "With regard to desirability, the glutes are gaining in popularity, however the glutes are far more than something nice to look at. The gluteus maximus is the largest muscle in the body and serves many important functions.",
        "lft": 1,
        "rght": 6,
        "tree_id": 7,
        "level": 0,
        "parent": null
      },
      {
        "id": 3,
        "name": "Quads",
        "name_en_us": "Quads",
        "scientific_name": null,
        "url_name": "Quads",
        "description": "The quadriceps consist of four heads (hence the name quadriceps). The heads are: the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius.\r\n\r\nWith the exception of the rectus femoris, all of the heads of the quadriceps have one function, which is extending the knee.\r\n\r\nThat means that the quadriceps are active every time you walk or stand up. Additionally, and in conjunction with the hamstrings, the quadriceps stabilizes the knee.",
        "description_en_us": "The quadriceps consist of four heads (hence the name quadriceps). The heads are: the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius.\r\n\r\nWith the exception of the rectus femoris, all of the heads of the quadriceps have one function, which is extending the knee.\r\n\r\nThat means that the quadriceps are active every time you walk or stand up. Additionally, and in conjunction with the hamstrings, the quadriceps stabilizes the knee.",
        "lft": 1,
        "rght": 10,
        "tree_id": 13,
        "level": 0,
        "parent": null
      },
      {
        "id": 50,
        "name": "Groin",
        "name_en_us": "Groin",
        "scientific_name": null,
        "url_name": "groin",
        "description": null,
        "description_en_us": null,
        "lft": 1,
        "rght": 2,
        "tree_id": 22,
        "level": 0,
        "parent": null
      }
    ],
    "muscles_primary": [
      {
        "id": 9,
        "name": "Glutes",
        "name_en_us": "Glutes",
        "scientific_name": null,
        "url_name": "Glutes",
        "description": "With regard to desirability, the glutes are gaining in popularity, however the glutes are far more than something nice to look at. The gluteus maximus is the largest muscle in the body and serves many important functions.",
        "description_en_us": "With regard to desirability, the glutes are gaining in popularity, however the glutes are far more than something nice to look at. The gluteus maximus is the largest muscle in the body and serves many important functions.",
        "lft": 1,
        "rght": 6,
        "tree_id": 7,
        "level": 0,
        "parent": null
      },
      {
        "id": 3,
        "name": "Quads",
        "name_en_us": "Quads",
        "scientific_name": null,
        "url_name": "Quads",
        "description": "The quadriceps consist of four heads (hence the name quadriceps). The heads are: the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius.\r\n\r\nWith the exception of the rectus femoris, all of the heads of the quadriceps have one function, which is extending the knee.\r\n\r\nThat means that the quadriceps are active every time you walk or stand up. Additionally, and in conjunction with the hamstrings, the quadriceps stabilizes the knee.",
        "description_en_us": "The quadriceps consist of four heads (hence the name quadriceps). The heads are: the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius.\r\n\r\nWith the exception of the rectus femoris, all of the heads of the quadriceps have one function, which is extending the knee.\r\n\r\nThat means that the quadriceps are active every time you walk or stand up. Additionally, and in conjunction with the hamstrings, the quadriceps stabilizes the knee.",
        "lft": 1,
        "rght": 10,
        "tree_id": 13,
        "level": 0,
        "parent": null
      }
    ],
    "muscles_secondary": [],
    "muscles_tertiary": [
      {
        "id": 50,
        "name": "Groin",
        "name_en_us": "Groin",
        "scientific_name": null,
        "url_name": "groin",
        "description": null,
        "description_en_us": null,
        "lft": 1,
        "rght": 2,
        "tree_id": 22,
        "level": 0,
        "parent": null
      }
    ],
    "grips": [
      {
        "id": 3,
        "name": "Neutral",
        "name_en_us": "Neutral",
        "description": "Neutral",
        "description_en_us": "Neutral",
        "url_name": "musclewiki.com/grips"
      }
    ],
    "category": {
      "id": 2,
      "name": "Dumbbells",
      "name_en_us": "Dumbbells",
      "include_in_api": true,
      "include_in_workout_generator": true,
      "display_order": 6,
      "enable": true,
      "featured": true,
      "image": null,
      "mobile_icon": null,
      "description": null
    },
    "difficulty": { "id": 4, "name": "Novice", "name_en_us": "Novice" },
    "force": {
      "id": 3,
      "name": "Push",
      "url_name": "musclewiki.com/force",
      "name_en_us": "Push",
      "description": "Pushing away from the body.",
      "description_en_us": "Pushing away from the body."
    },
    "mechanic": {
      "id": 3,
      "name": "Compound",
      "url_name": "musclewiki.com/mechanic",
      "name_en_us": "Compound",
      "description": "Exercise trains multiple body parts.",
      "description_en_us": "Exercise trains multiple body parts."
    },
    "long_form_content": [
      {
        "id": 203,
        "gender": { "id": 1, "name": "Male", "name_en_us": "Male" },
        "youtube_link": "https://www.youtube.com/embed/AVoaEg7NTFU?si=4TDAmEvzarJ2MIiH",
        "exercise": 11
      },
      {
        "id": 204,
        "gender": { "id": 2, "name": "Female", "name_en_us": "Female" },
        "youtube_link": "https://www.youtube.com/embed/AVoaEg7NTFU?si=4TDAmEvzarJ2MIiH",
        "exercise": 11
      }
    ],
    "correct_steps": [
      {
        "id": 36,
        "order": 1,
        "text": "Hold the weight tucked into your upper chest area, keeping your elbows in. Your feet should be slightly wider than shoulder width.",
        "text_en_us": "Hold the weight tucked into your upper chest area, keeping your elbows in. Your feet should be slightly wider than shoulder width.",
        "exercise": 11
      },
      {
        "id": 37,
        "order": 2,
        "text": "Sink down into the squat, keeping your elbows inside the track of your knees.",
        "text_en_us": "Sink down into the squat, keeping your elbows inside the track of your knees.",
        "exercise": 11
      },
      {
        "id": 38,
        "order": 3,
        "text": "Push through your heels while keeping your chest up and return to starting position.",
        "text_en_us": "Push through your heels while keeping your chest up and return to starting position.",
        "exercise": 11
      }
    ],
    "target_url": {
      "male": "dumbbells/male/glutes/dumbbell-goblet-squat",
      "female": "dumbbells/female/glutes/dumbbell-goblet-squat"
    },
    "male_images": [
      {
        "id": 21,
        "order": 1,
        "dst_link": "https://www.youtube.com/watch?v=spH48D1Nw9I",
        "src_image": "https://media.musclewiki.com/media/uploads/male-dumbbell-goblet-squat-front.gif",
        "og_image": "https://media.musclewiki.com/media/uploads/og-male-dumbbell-goblet-squat-front.jpg",
        "original_video": null,
        "unbranded_video": null,
        "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-goblet-squat-front.mp4",
        "gender": 1,
        "exercise": 11
      },
      {
        "id": 22,
        "order": 2,
        "dst_link": "https://www.youtube.com/watch?v=spH48D1Nw9I",
        "src_image": "https://media.musclewiki.com/media/uploads/male-dumbbell-goblet-squat-side.gif",
        "og_image": "https://media.musclewiki.com/media/uploads/og-male-dumbbell-goblet-squat-side.jpg",
        "original_video": null,
        "unbranded_video": null,
        "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-goblet-squat-side.mp4",
        "gender": 1,
        "exercise": 11
      }
    ],
    "female_images": [
      {
        "id": 96,
        "order": 1,
        "dst_link": "https://www.youtube.com/watch?v=spH48D1Nw9I",
        "src_image": "https://media.musclewiki.com/media/uploads/female-dumbbell-goblet-squat-front.gif",
        "og_image": "https://media.musclewiki.com/media/uploads/og-female-dumbbell-goblet-squat-front.jpg",
        "original_video": null,
        "unbranded_video": null,
        "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-goblet-squat-front.mp4",
        "gender": 2,
        "exercise": 11
      },
      {
        "id": 97,
        "order": 2,
        "dst_link": "https://www.youtube.com/watch?v=spH48D1Nw9I",
        "src_image": "https://media.musclewiki.com/media/uploads/female-dumbbell-goblet-squat-side.gif",
        "og_image": "https://media.musclewiki.com/media/uploads/og-female-dumbbell-goblet-squat-side.jpg",
        "original_video": null,
        "unbranded_video": null,
        "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-goblet-squat-side.mp4",
        "gender": 2,
        "exercise": 11
      }
    ],
    "full_measure": {
      "id": 4,
      "measure": {
        "id": 2,
        "units": [
          { "id": 4, "name": "lbs" },
          { "id": 5, "name": "kg" }
        ],
        "name": "weight"
      },
      "denominator": { "id": 1, "units": [], "name": "reps" },
      "calculation_mode": { "id": 2, "name": "MUL", "description": "" }
    },
    "body_map_images": [
      {
        "id": 19,
        "gender": { "id": 1, "name": "Male", "name_en_us": "Male" },
        "kind": "Muscles Impacted",
        "dark_mode": false,
        "front": "https://media.musclewiki.com/media/uploads/videos/bodymaps/dumbbell_goblet_squat_front_male_xeMcKIh.png",
        "back": "https://media.musclewiki.com/media/uploads/videos/bodymaps/dumbbell_goblet_squat_back_male_dqs1qK4.png",
        "exercise": 11
      },
      {
        "id": 20,
        "gender": { "id": 2, "name": "Female", "name_en_us": "Female" },
        "kind": "Muscles Impacted",
        "dark_mode": false,
        "front": "https://media.musclewiki.com/media/uploads/videos/bodymaps/dumbbell_goblet_squat_front_female_btt91LO.png",
        "back": "https://media.musclewiki.com/media/uploads/videos/bodymaps/dumbbell_goblet_squat_back_female_Vv48M9i.png",
        "exercise": 11
      }
    ],
    "name": "Dumbbell Goblet Squat"
  },
  "superset": 1,
  "reps_or_duration": "reps",
  "reps_or_duration_count": "10",
  "sets": "3",
  "sort": 1,
  "notes": "",
  "workout": 70
}



