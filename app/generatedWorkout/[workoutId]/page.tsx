"use client"
import { getWorkoutPlan } from '@/app/lib/workout';
import Load from '@/components/load';
import { WorkoutData } from '@/types/allTypes';
import { Activity, ChevronDown, ChevronUp, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'



export default function page({
  params,
}: {
  params: Promise<{ workoutId: string }>
}) {
  const [workoutData, setWorkoutData] = useState<WorkoutData>()
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    params.then(async ({ workoutId }) => {
      // setWorkoutId(workoutId)
      let plan = await getWorkoutPlan(workoutId)
      setWorkoutData(plan as WorkoutData)
      setLoading(false)
    })
  }, [params])

  const formatMuscleName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const getFatigueColor = (fatigue: number) => {
    if (fatigue >= 3) return 'bg-red-600';
    if (fatigue >= 2) return 'bg-orange-400';
    if (fatigue >= 1) return 'bg-yellow-300';
    return 'bg-gray-200';
  };
  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleExpand = (id: any) => {
    if (expandedExercise === id) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(id);
    }
  };

  // Count total number of sets
  const totalSets = workoutData?.exercises.reduce(
    (total, ex) => total + ex.sets.regular + ex.sets.warmup,
    0
  );

  // Get unique target muscles
  const targetMuscles = new Set();
  workoutData?.exercises.forEach(ex => {
    if (ex.exercise.muscles_primary) {
      ex.exercise.muscles_primary.forEach(muscle => {
        targetMuscles.add(muscle.name);
      });
    }
  });

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Load />
      </div>
    );
  }
  return (
    <div className='w-full min-h-screen'>
      <div className="max-w-3xl mx-auto mt-6 mb-4 flex justify-start">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          // onClick={() => window.history.back()}
        >
          <Link href="/home/workouts" className='w-full h-full flex items-center justify-center'>
          &larr; Return to Workouts
          </Link>
        </button>
      </div>
      <div className="max-w-3xl mx-auto p-4 bg-gray-50 rounded-lg shadow">
        {/* Workout Summary */}

        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Workout Summary</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Exercises</p>
              <p className="text-xl font-bold">{workoutData?.exercises.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Total Sets</p>
              <p className="text-xl font-bold">{totalSets}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Target Muscles</p>
              <p className="text-xl font-bold">{targetMuscles.size}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Difficulty</p>
              <p className="text-xl font-bold">Novice</p>
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="space-y-4">
          {workoutData?.exercises.map((exerciseData, index) => {
            const exercise = exerciseData.exercise;
            const isExpanded = expandedExercise === exercise.id;

            // Determine exercise icon based on category
            const getExerciseIcon = () => {
              if (exercise.category.name === "Cardio") {
                return <Activity className="h-5 w-5 text-blue-500" />;
              }
              return <Dumbbell className="h-5 w-5 text-gray-600" />;
            };

            return (
              <div key={`${exercise.id}-${index}`} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Exercise Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleExpand(exercise.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {getExerciseIcon()}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                      <p className="text-sm text-gray-500">{exercise.category.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right mr-2">
                      <p className="text-sm font-medium">{exerciseData.sets.regular + exerciseData.sets.warmup} sets</p>
                      <p className="text-xs text-gray-500">{exerciseData.reps} reps</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Exercise Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Workout Details</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-2 rounded border border-gray-200">
                          <p className="text-xs text-gray-500">Regular Sets</p>
                          <p className="font-bold">{exerciseData.sets.regular}</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-gray-200">
                          <p className="text-xs text-gray-500">Warmup Sets</p>
                          <p className="font-bold">{exerciseData.sets.warmup}</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-gray-200">
                          <p className="text-xs text-gray-500">Reps</p>
                          <p className="font-bold">{exerciseData.reps}</p>
                        </div>
                      </div>
                    </div>

                    {/* Primary Muscles */}
                    {exercise.muscles_primary && exercise.muscles_primary.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Target Muscles</h4>
                        <div className="flex flex-wrap gap-2">
                          {exercise.muscles_primary.map((muscle, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {muscle.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Fatigue Levels */}
                    {exerciseData.fatigue && exerciseData.fatigue.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Fatigue Impact</h4>
                        <div className="space-y-2">
                          {exerciseData.fatigue.map((fatigue, i) => (
                            <div key={i} className="flex items-center">
                              <span className="w-1/3 text-sm">{formatMuscleName(fatigue.muscle_name)}</span>
                              <div className="w-2/3 h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${getFatigueColor(fatigue.fatigue)}`}
                                  style={{ width: `${Math.min(fatigue.fatigue * 33.3, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Explore More Button */}
                    <div className="mt-4">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        onClick={() => {
                          window.location.href = `/searchWorkout/${exercise.slug}`;
                        }}
                      >
                        Explore More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Muscle Heatmap */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Muscle Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {workoutData?.body_map.map((muscle, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: muscle.daily_gradient }}
                ></div>
                <span className="text-sm">{formatMuscleName(muscle.muscle_name)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
