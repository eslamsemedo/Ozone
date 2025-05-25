"use client"
import React, { useEffect, useState } from 'react';
import { fetchExcersice } from '@/app/lib/workout';
import Load from '@/components/load';
import InfoExersice from '@/components/InfoExersice';
import Image from 'next/image';
import BackBtn from '@/components/backBtn';




// interface FatigueItem {
//   muscle_name: string;
//   daily_gradient: string;
//   weekly_gradient: string;
//   fatigue: number;
// }

// interface ExerciseData {
//   id: number;
//   name: string;
//   category: { name: string };
//   difficulty: { name: string };
//   muscles_primary?: { name: string }[];
//   male_images: { og_image: string; unbranded_video?: string }[];
//   female_images: { og_image: string; unbranded_video?: string }[];
//   mechanic: { name: string, description: string };
//   force: { name: string; description: string };
//   target_url: { male: string; female: string };
//   sets: string;
//   reps_or_duration: string;
//   reps_or_duration_count: string;
//   sort: number;
//   superset: number;
//   workout: number;
//   fatigue: FatigueItem[];

// }

// interface WorkoutItem {
//   exercise: ExerciseData;
//   reps_or_duration_count: string;
//   sets: number;
// }


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

export interface WorkoutItem {
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

export default function Page({ params }: { params: { excersice: string } }) {
  const [items, setItems] = useState<WorkoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [showexersice, setShowexersice] = useState<WorkoutItem | null>(null);

  useEffect(() => {
    let fetchdata = async () => {
      const { excersice } = await params;
      console.log(excersice)
      fetchExcersice(excersice)
        .then(data => {
          setItems(data.results[0].exercises as WorkoutItem[]);
          console.log(data.results[0].exercises)
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
    fetchdata()
  }, [params]);

  const renderFatigueLevel = (level: number) => {
    if (level >= 3) return 'High';
    if (level >= 2) return 'Medium';
    if (level >= 1) return 'Low';
    return 'Very Low';
  };

  const getFatigueColor = (gradient: string) => {
    switch (gradient) {
      case '#ff0000': return 'bg-red-500';
      case '#ffcc66': return 'bg-amber-400';
      case '#ffcc99': return 'bg-orange-300';
      case '#ffffcc': return 'bg-yellow-200';
      case '#fafdb8': return 'bg-yellow-100';
      case '#f4f7fa': return 'bg-gray-100';
      default: return 'bg-gray-200';
    }
  };

  const getMediaUrl = (item: WorkoutItem) => {
    const imgs = gender === 'male' ? item.exercise.male_images : item.exercise.female_images;
    if (!imgs.length) return { image: '/api/placeholder/300/400', video: '' };
    return { image: imgs[0].og_image, video: imgs[0].branded_video || '' };
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Load />
      </div>
    );
  }

  if (showexersice != null) {
    return <InfoExersice obj={showexersice} back={setShowexersice} />
  }

  // return (
  //   <div className="">
  //     {items.map((item, index) => {
  //       const media = getMediaUrl(item);
  //       return (
  //         <div key={item.exercise.id}
  //           onClick={() => {
  //             setShowexersice(item)
  //             window.scrollTo({ top: 0, behavior: 'smooth' });
  //             // console.log(showexersice)
  //           }}
  //           className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-6">
  //           <div className="relative h-64 w-full bg-gray-100">
  //             {mediaType === 'image' ? (
  //               <Image src={media.image} alt={item.exercise.name}
  //                 width={300}   // ✅ Set appropriate width
  //                 height={200}
  //                 className="w-full h-full object-cover" />
  //             ) : (
  //               <video src={media.video} controls className="w-full h-full object-cover" />
  //             )}
  //             <div className="absolute bottom-2 left-2 flex space-x-2">
  //               <button
  //                 onClick={() => setMediaType('image')}
  //                 className={`px-2 py-1 text-sm rounded ${mediaType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //               >Image</button>
  //               <button
  //                 onClick={() => setMediaType('video')}
  //                 className={`px-2 py-1 text-sm rounded ${mediaType === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //               >Video</button>
  //             </div>
  //           </div>
  //           <div className="p-4">
  //             <h3 className="text-lg font-bold mb-1">{item.exercise.name}</h3>
  //             <div className="text-sm text-gray-500 mb-2">
  //               {item.exercise.category.name} • {item.exercise.difficulty.name}
  //             </div>
  //             <div className="text-sm text-gray-700 mb-2">Reps: {item.reps_or_duration_count}</div>
  //             <div className="text-sm text-gray-700 mb-4">
  //               {/* Sets: {item.sets.regular}{item.sets.warmup > 0 ? `, ${item.sets.warmup} warmup` : ''} */}
  //               Sets: {item.sets}
  //             </div>

  //             <div className="mb-4">
  //               <span className="mr-2">Force: {item.exercise.force.name}</span>
  //               <span className="mr-2">Mechanic: {item.exercise.mechanic.name}</span>
  //               <span>Difficulty: {item.exercise.difficulty.name}</span>
  //             </div>

  //             {/* <div className="mb-4">
  //               <h4 className="font-semibold mb-2">Fatigue</h4>
  //               {item.exercise.fatigue?.map((f, idx) => (
  //                 <div key={idx} className="flex items-center mb-1">
  //                   <div className="w-1/3 text-sm capitalize">{f.muscle_name.replace(/-/g, ' ')}</div>
  //                   <div className="flex items-center w-2/3">
  //                     <div className={`w-4 h-4 rounded-full mr-2 ${getFatigueColor(f.daily_gradient)}`}></div>
  //                     <span className="text-sm">{renderFatigueLevel(f.fatigue)}</span>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div> */}

  //             <div>
  //               <a
  //                 href={`https://musclewiki.com/${item.exercise.target_url[gender]}`}
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 className="text-blue-500 hover:underline text-sm"
  //               >View detailed {gender} guide →</a>
  //             </div>

  //             <div className="mt-4 flex space-x-2">
  //               <button
  //                 onClick={() => setGender('male')}
  //                 className={`px-3 py-1 text-sm rounded ${gender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  //               >Male</button>
  //               <button
  //                 onClick={() => setGender('female')}
  //                 className={`px-3 py-1 text-sm rounded ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
  //               >Female</button>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );


  const handleClick = (i: { male: string; female: string; }) => {
      let slug = gender === "male" ? i.male : i.female;
      window.location.href = `/searchWorkout/${slug.substring(slug.lastIndexOf('/') + 1)}`;
  }
  return (
    <div className="flex gap-4 flex-wrap px-6 py-20 md:px-16 bg-black">
      <div className="absolute top-4 left-4">
        
        <BackBtn/>
      </div>
      {items.map((item, index) => {
        const media = getMediaUrl(item);
        return (
          //--------------------------
          <div
            key={item.exercise.id}
            className=" max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-6"
            onClick={()=>handleClick(item.exercise.target_url)}
          >
            <div className="relative h-64 w-full bg-gray-100">
              {mediaType === "image" ? (
                <img
                  src={media.image}
                  alt={item.exercise.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={media.video}
                  controls
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute top-2 left-2 flex space-x-2">
                <button
                  onClick={() => setMediaType("image")}
                  className={`px-2 py-1 text-sm rounded ${mediaType === "image"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                    }`}
                >
                  Image
                </button>
                <button
                  onClick={() => setMediaType("video")}
                  className={`px-2 py-1 text-sm rounded ${mediaType === "video"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                    }`}
                >
                  Video
                </button>
              </div>
            </div>
            {/* ////////////////////////////////////// */}

            <div className="p-4 ">
              <h3 className="text-lg font-bold mb-1">{item.exercise.name}</h3>
              <div className="text-sm text-gray-500 mb-2">
                {item.exercise.category.name} • {item.exercise.difficulty.name}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                Reps: {item.reps_or_duration_count}
              </div>
              <div className="text-sm text-gray-700 mb-4">
                {/* Sets: {item.sets.regular}{item.sets.warmup > 0 ? `, ${item.sets.warmup} warmup` : ''} */}
                Sets: {item.sets}
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="mr-2 bg-[#042062] rounded-3xl py-1 px-3 text-white">
                  Force: {item.exercise.force.name}
                </span>
                <span className="mr-2  bg-[#042062] rounded-3xl py-1 px-3 text-white">
                  Mechanic: {item.exercise.mechanic.name}
                </span>
                {/* <span>Difficulty: {item.exercise.difficulty.name}</span> */}
              </div>

              <div className="mb-4">
                {/* <h4 className="font-semibold mb-2">Fatigue</h4> */}
                {/* {item.exercise.fatigue?.map((f, idx) => (
                  <div key={idx} className="flex items-center mb-1">
                    <div className="w-1/3 text-sm capitalize">
                      {f.muscle_name.replace(/-/g, " ")}
                    </div>
                    <div className="flex items-center w-2/3">
                      <div
                        className={`w-4 h-4 rounded-full mr-2 ${getFatigueColor(
                          f.daily_gradient
                        )}`}
                      ></div>
                      <span className="text-sm">
                        {renderFatigueLevel(f.fatigue)}
                      </span>
                    </div>
                  </div>
                ))} */}
              </div>

              {/* <div>
                <a
                  href={`https://musclewiki.com/${item.exercise.target_url[gender]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View detailed {gender} guide →
                </a>
              </div> */}

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setGender("male")}
                  className={`px-3 py-1 text-sm rounded ${gender === "male" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`px-3 py-1 text-sm rounded ${gender === "female"
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200"
                    }`}
                >
                  Female
                </button>
              </div>
              <div className="mt-3">
                <a
                  href={`https://musclewiki.com/${item.exercise.target_url[gender]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View detailed {gender} guide →
                </a>
              </div>
            </div>
          </div>
          //-----------------------------------------------------
        );
      })}
    </div>
  );

}
