import React, { useEffect, useState } from 'react';

const WorkoutDisplay = () => {
  interface WorkoutData {
    body_map: {
      daily_gradient: string;
      weekly_gradient: string;
      muscle_name: string
    }[];
    exercises: {
      exercise: any;
      fatigue: {
        muscle_name: string;
        daily_gradient: string;
        weekly_gradient: string;
        fatigue: number
      }[];
      reps: string;
      sets: {
        regular: number;
        warmup: number
      };
    }[];
  }

  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('exercises');

  useEffect(() => {
    // Simulate fetching data
    setWorkoutData({
      "exercises": [
        {
          "exercise": {
            "id": 1199,
            "muscles_primary": [],
            "category": {
              "id": 27,
              "name": "Cardio",
              "name_en_us": "Cardio",
              "include_in_api": true,
              "include_in_workout_generator": false,
              "display_order": 21,
              "enable": true,
              "featured": false,
              "image": null,
              "mobile_icon": null,
              "description": null
            },
            "difficulty": {
              "id": 4,
              "name": "Novice",
              "name_en_us": "Novice"
            },
            "male_images": [
              {
                "id": 5674,
                "order": 1,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-Cardio-treadmill-jog-front.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/male-Cardio-treadmill-jog-front.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/male-Cardio-treadmill-jog-front.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-Cardio-treadmill-jog-front.mp4",
                "gender": 1,
                "exercise": 1199
              },
              {
                "id": 5675,
                "order": 2,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-Cardio-treadmill-jog-side.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/male-Cardio-treadmill-jog-side.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/male-Cardio-treadmill-jog-side.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-Cardio-treadmill-jog-side.mp4",
                "gender": 1,
                "exercise": 1199
              }
            ],
            "female_images": [
              {
                "id": 5672,
                "order": 2,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-Cardio-treadmill-jog-side.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/female-Cardio-treadmill-jog-side.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/female-Cardio-treadmill-jog-side.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-Cardio-treadmill-jog-side.mp4",
                "gender": 2,
                "exercise": 1199
              },
              {
                "id": 5673,
                "order": 1,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-Cardio-treadmill-jog-front.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/female-Cardio-treadmill-jog-front.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/female-Cardio-treadmill-jog-front.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-Cardio-treadmill-jog-front.mp4",
                "gender": 2,
                "exercise": 1199
              }
            ],
            "full_measure": {
              "id": 9,
              "measure": {
                "id": 3,
                "units": [
                  {
                    "id": 6,
                    "name": "km"
                  },
                  {
                    "id": 7,
                    "name": "mi"
                  }
                ],
                "name": "distance"
              },
              "denominator": {
                "id": 3,
                "units": [
                  {
                    "id": 1,
                    "name": "s"
                  }
                ],
                "name": "duration"
              },
              "calculation_mode": null
            },
            "name": "Treadmill Jog",
            "slug": "treadmill-jog",
            "featured_weight": 1
          },
          "fatigue": [
            {
              "muscle_name": "calves",
              "fatigue": 1.0,
              "daily_gradient": "#f4f7fa",
              "weekly_gradient": "#f4f7fa"
            },
            {
              "muscle_name": "glutes",
              "fatigue": 1.0,
              "daily_gradient": "#fafdb8",
              "weekly_gradient": "#f4f7fa"
            },
            {
              "muscle_name": "hamstrings",
              "fatigue": 1.0,
              "daily_gradient": "#ffcc99",
              "weekly_gradient": "#f4f7fa"
            },
            {
              "muscle_name": "quads",
              "fatigue": 0.67,
              "daily_gradient": "#ffffcc",
              "weekly_gradient": "#f4f7fa"
            }
          ],
          "reps": "10-min",
          "sets": {
            "regular": 1,
            "warmup": 1
          }
        },
        {
          "exercise": {
            "id": 1507,
            "muscles_primary": [
              {
                "id": 2,
                "name": "Chest",
                "name_en_us": "Chest",
                "scientific_name": null,
                "url_name": "Chest",
                "description": "Primarily, there are three chest muscles involved in movement: the pectoralis major, the pectoralis minor, and the serratus anterior.\r\n\r\nPectoral muscles are most predominantly associated with movement of the shoulders and arms. When working together, they provide stability for bone structures such as the clavicle (collar bone) and the scapula (shoulder). Muscles of the chest enable us to lift, extend, and rotate our arms, along with playing a part in the process of respiration. Chest muscles are required in order to carry out everyday activities like moving furniture, lifting heavy objects, pitching a baseball, and stretching our arms.",
                "description_en_us": "Primarily, there are three chest muscles involved in movement: the pectoralis major, the pectoralis minor, and the serratus anterior.\r\n\r\nPectoral muscles are most predominantly associated with movement of the shoulders and arms. When working together, they provide stability for bone structures such as the clavicle (collar bone) and the scapula (shoulder). Muscles of the chest enable us to lift, extend, and rotate our arms, along with playing a part in the process of respiration. Chest muscles are required in order to carry out everyday activities like moving furniture, lifting heavy objects, pitching a baseball, and stretching our arms.",
                "lft": 1,
                "rght": 6,
                "tree_id": 14,
                "level": 0,
                "parent": null
              }
            ],
            "category": {
              "id": 4,
              "name": "Machine",
              "name_en_us": "Machine",
              "include_in_api": false,
              "include_in_workout_generator": true,
              "display_order": 7,
              "enable": true,
              "featured": true,
              "image": null,
              "mobile_icon": null,
              "description": null
            },
            "difficulty": {
              "id": 4,
              "name": "Novice",
              "name_en_us": "Novice"
            },
            "male_images": [
              {
                "id": 6907,
                "order": 2,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-Machine-machine-pec-fly-side.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/male-Machine-machine-pec-fly-side.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/male-Machine-machine-pec-fly-side.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-pec-fly-side.mp4",
                "gender": 1,
                "exercise": 1507
              },
              {
                "id": 6913,
                "order": 1,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-Machine-machine-pec-fly-front.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/male-Machine-machine-pec-fly-front.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/male-Machine-machine-pec-fly-front.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-Machine-machine-pec-fly-front.mp4",
                "gender": 1,
                "exercise": 1507
              }
            ],
            "female_images": [
              {
                "id": 6906,
                "order": 1,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-Machine-machine-pec-fly-front.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/female-Machine-machine-pec-fly-front.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/female-Machine-machine-pec-fly-front.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-Machine-machine-pec-fly-front.mp4",
                "gender": 2,
                "exercise": 1507
              },
              {
                "id": 6908,
                "order": 2,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-Machine-machine-pec-fly-side.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/female-Machine-machine-pec-fly-side.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/female-Machine-machine-pec-fly-side.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-Machine-machine-pec-fly-side.mp4",
                "gender": 2,
                "exercise": 1507
              }
            ],
            "full_measure": {
              "id": 4,
              "measure": {
                "id": 2,
                "units": [
                  {
                    "id": 4,
                    "name": "lbs"
                  },
                  {
                    "id": 5,
                    "name": "kg"
                  }
                ],
                "name": "weight"
              },
              "denominator": {
                "id": 1,
                "units": [],
                "name": "reps"
              },
              "calculation_mode": {
                "id": 2,
                "name": "MUL",
                "description": ""
              }
            },
            "name": "Machine Pec Fly",
            "slug": "machine-pec-fly",
            "featured_weight": 495
          },
          "fatigue": [
            {
              "muscle_name": "chest",
              "fatigue": 3.0,
              "daily_gradient": "#ff0000",
              "weekly_gradient": "#ffffcc"
            }
          ],
          "reps": "8-12",
          "sets": {
            "regular": 3,
            "warmup": 0
          }
        },
        {
          "exercise": {
            "id": 241,
            "muscles_primary": [
              {
                "id": 5,
                "name": "Triceps",
                "name_en_us": "Triceps",
                "scientific_name": null,
                "url_name": "Triceps",
                "description": "The triceps are a muscle with three heads, hence the name. Those heads are the long head, lateral head, and medial head. The triceps are traditionally considered a powerhouse due to their overwhelmingly fast twitch. This expression refers to muscle fibers which expend energy quickly, and the triceps are particularly dominant in this trait. The triceps are involved during any pushing movement.",
                "description_en_us": "The triceps are a muscle with three heads, hence the name. Those heads are the long head, lateral head, and medial head. The triceps are traditionally considered a powerhouse due to their overwhelmingly fast twitch. This expression refers to muscle fibers which expend energy quickly, and the triceps are particularly dominant in this trait. The triceps are involved during any pushing movement.",
                "lft": 1,
                "rght": 8,
                "tree_id": 11,
                "level": 0,
                "parent": null
              }
            ],
            "category": {
              "id": 9,
              "name": "Cables",
              "name_en_us": "Cables",
              "include_in_api": true,
              "include_in_workout_generator": true,
              "display_order": 4,
              "enable": true,
              "featured": true,
              "image": null,
              "mobile_icon": null,
              "description": null
            },
            "difficulty": {
              "id": 4,
              "name": "Novice",
              "name_en_us": "Novice"
            },
            "male_images": [
              {
                "id": 4618,
                "order": 2,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-Cables-cable-push-down-side.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/male-Cables-cable-push-down-side.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/male-Cables-cable-push-down-side.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-Cables-cable-push-down-side.mp4",
                "gender": 1,
                "exercise": 241
              },
              {
                "id": 4619,
                "order": 1,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-Cables-cable-push-down-front.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/male-Cables-cable-push-down-front.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/male-Cables-cable-push-down-front.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-Cables-cable-push-down-front.mp4",
                "gender": 1,
                "exercise": 241
              }
            ],
            "female_images": [
              {
                "id": 4620,
                "order": 2,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-Cables-cable-push-down-side.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/female-Cables-cable-push-down-side.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/female-Cables-cable-push-down-side.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-Cables-cable-push-down-side.mp4",
                "gender": 2,
                "exercise": 241
              },
              {
                "id": 4621,
                "order": 1,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-Cables-cable-push-down-front.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/female-Cables-cable-push-down-front.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/female-Cables-cable-push-down-front.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-Cables-cable-push-down-front.mp4",
                "gender": 2,
                "exercise": 241
              }
            ],
            "full_measure": {
              "id": 4,
              "measure": {
                "id": 2,
                "units": [
                  {
                    "id": 4,
                    "name": "lbs"
                  },
                  {
                    "id": 5,
                    "name": "kg"
                  }
                ],
                "name": "weight"
              },
              "denominator": {
                "id": 1,
                "units": [],
                "name": "reps"
              },
              "calculation_mode": {
                "id": 2,
                "name": "MUL",
                "description": ""
              }
            },
            "name": "Cable Rope Pushdown",
            "slug": "cable-rope-pushdown",
            "featured_weight": 440
          },
          "fatigue": [
            {
              "muscle_name": "triceps",
              "fatigue": 3.0,
              "daily_gradient": "#ff0000",
              "weekly_gradient": "#fafdb8"
            }
          ],
          "reps": "8-12",
          "sets": {
            "regular": 3,
            "warmup": 0
          }
        },
        {
          "exercise": {
            "id": 45,
            "muscles_primary": [
              {
                "id": 6,
                "name": "Shoulders",
                "name_en_us": "Shoulders",
                "scientific_name": null,
                "url_name": "Shoulders",
                "description": "For both men and women, the deltoids, also referred to as delts, are a very desirable muscle to build. Well-developed shoulders can give the appearance of a smaller waist (because the shoulders look broader). Therefore, well-trained delts improve the look of the entire physique.\r\n\r\nThe deltoid has three different heads: anterior (front), lateral (middle), and posterior (rear). Each head has similar functions, but they do have some variance.",
                "description_en_us": "For both men and women, the deltoids, also referred to as delts, are a very desirable muscle to build. Well-developed shoulders can give the appearance of a smaller waist (because the shoulders look broader). Therefore, well-trained delts improve the look of the entire physique.\r\n\r\nThe deltoid has three different heads: anterior (front), lateral (middle), and posterior (rear). Each head has similar functions, but they do have some variance.",
                "lft": 1,
                "rght": 8,
                "tree_id": 10,
                "level": 0,
                "parent": null
              },
              {
                "id": 19,
                "name": "Anterior Deltoid",
                "name_en_us": "Anterior Deltoid",
                "scientific_name": null,
                "url_name": "anterior-deltoid",
                "description": "",
                "description_en_us": "",
                "lft": 4,
                "rght": 5,
                "tree_id": 10,
                "level": 1,
                "parent": 6
              },
              {
                "id": 47,
                "name": "Front Shoulders",
                "name_en_us": "Front Shoulders",
                "scientific_name": "Front Deltoids",
                "url_name": "front-shoulders",
                "description": null,
                "description_en_us": null,
                "lft": 1,
                "rght": 2,
                "tree_id": 19,
                "level": 0,
                "parent": null
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
            "difficulty": {
              "id": 4,
              "name": "Novice",
              "name_en_us": "Novice"
            },
            "male_images": [
              {
                "id": 330,
                "order": 1,
                "dst_link": "https://www.youtube.com/watch?v=C0We_bEyxlM",
                "src_image": "https://media.musclewiki.com/media/uploads/male-dumbbell-seated-overhead-press-front.gif",
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-dumbbell-seated-overhead-press-front.jpg",
                "original_video": null,
                "unbranded_video": null,
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-seated-overhead-press-front.mp4",
                "gender": 1,
                "exercise": 45
              },
              {
                "id": 331,
                "order": 2,
                "dst_link": "https://www.youtube.com/watch?v=C0We_bEyxlM",
                "src_image": "https://media.musclewiki.com/media/uploads/male-dumbbell-seated-overhead-press-side.gif",
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-dumbbell-seated-overhead-press-side.jpg",
                "original_video": null,
                "unbranded_video": null,
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-seated-overhead-press-side.mp4",
                "gender": 1,
                "exercise": 45
              }
            ],
            "female_images": [
              {
                "id": 110,
                "order": 1,
                "dst_link": "https://www.youtube.com/watch?v=C0We_bEyxlM",
                "src_image": "https://media.musclewiki.com/media/uploads/female-dumbbell-seated-overhead-press-front.gif",
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-dumbbell-seated-overhead-press-front.jpg",
                "original_video": null,
                "unbranded_video": null,
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-seated-overhead-press-front.mp4",
                "gender": 2,
                "exercise": 45
              },
              {
                "id": 111,
                "order": 2,
                "dst_link": "https://www.youtube.com/watch?v=C0We_bEyxlM",
                "src_image": "https://media.musclewiki.com/media/uploads/female-dumbbell-seated-overhead-press-side.gif",
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-dumbbell-seated-overhead-press-side.jpg",
                "original_video": null,
                "unbranded_video": null,
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-seated-overhead-press-side.mp4",
                "gender": 2,
                "exercise": 45
              }
            ],
            "full_measure": {
              "id": 4,
              "measure": {
                "id": 2,
                "units": [
                  {
                    "id": 4,
                    "name": "lbs"
                  },
                  {
                    "id": 5,
                    "name": "kg"
                  }
                ],
                "name": "weight"
              },
              "denominator": {
                "id": 1,
                "units": [],
                "name": "reps"
              },
              "calculation_mode": {
                "id": 2,
                "name": "MUL",
                "description": ""
              }
            },
            "name": "Dumbbell Seated Overhead Press",
            "slug": "dumbbell-seated-overhead-press",
            "featured_weight": 320
          },
          "fatigue": [
            {
              "muscle_name": "shoulders",
              "fatigue": 3.0,
              "daily_gradient": "0",
              "weekly_gradient": "0"
            },
            {
              "muscle_name": "anterior-deltoid",
              "fatigue": 3.0,
              "daily_gradient": "#ff0000",
              "weekly_gradient": "#fafdb8"
            },
            {
              "muscle_name": "front-shoulders",
              "fatigue": 3.0,
              "daily_gradient": "#ff0000",
              "weekly_gradient": "#f4f7fa"
            },
            {
              "muscle_name": "lateral-deltoid",
              "fatigue": 2.0100000000000002,
              "daily_gradient": "#ffcc66",
              "weekly_gradient": "#ffffcc"
            },
            {
              "muscle_name": "triceps",
              "fatigue": 2.0100000000000002,
              "daily_gradient": "#ff0000",
              "weekly_gradient": "#ffffcc"
            }
          ],
          "reps": "4-6",
          "sets": {
            "regular": 3,
            "warmup": 0
          }
        },
        {
          "exercise": {
            "id": 1199,
            "muscles_primary": [],
            "category": {
              "id": 27,
              "name": "Cardio",
              "name_en_us": "Cardio",
              "include_in_api": true,
              "include_in_workout_generator": false,
              "display_order": 21,
              "enable": true,
              "featured": false,
              "image": null,
              "mobile_icon": null,
              "description": null
            },
            "difficulty": {
              "id": 4,
              "name": "Novice",
              "name_en_us": "Novice"
            },
            "male_images": [
              {
                "id": 5674,
                "order": 1,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-Cardio-treadmill-jog-front.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/male-Cardio-treadmill-jog-front.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/male-Cardio-treadmill-jog-front.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-Cardio-treadmill-jog-front.mp4",
                "gender": 1,
                "exercise": 1199
              },
              {
                "id": 5675,
                "order": 2,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-male-Cardio-treadmill-jog-side.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/male-Cardio-treadmill-jog-side.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/male-Cardio-treadmill-jog-side.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/male-Cardio-treadmill-jog-side.mp4",
                "gender": 1,
                "exercise": 1199
              }
            ],
            "female_images": [
              {
                "id": 5672,
                "order": 2,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-Cardio-treadmill-jog-side.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/female-Cardio-treadmill-jog-side.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/female-Cardio-treadmill-jog-side.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-Cardio-treadmill-jog-side.mp4",
                "gender": 2,
                "exercise": 1199
              },
              {
                "id": 5673,
                "order": 1,
                "dst_link": null,
                "src_image": null,
                "og_image": "https://media.musclewiki.com/media/uploads/og-female-Cardio-treadmill-jog-front.jpg",
                "original_video": "https://media.musclewiki.com/media/uploads/videos/original/female-Cardio-treadmill-jog-front.mp4",
                "unbranded_video": "https://media.musclewiki.com/media/uploads/videos/unbranded/female-Cardio-treadmill-jog-front.mp4",
                "branded_video": "https://media.musclewiki.com/media/uploads/videos/branded/female-Cardio-treadmill-jog-front.mp4",
                "gender": 2,
                "exercise": 1199
              }
            ],
            "full_measure": {
              "id": 9,
              "measure": {
                "id": 3,
                "units": [
                  {
                    "id": 6,
                    "name": "km"
                  },
                  {
                    "id": 7,
                    "name": "mi"
                  }
                ],
                "name": "distance"
              },
              "denominator": {
                "id": 3,
                "units": [
                  {
                    "id": 1,
                    "name": "s"
                  }
                ],
                "name": "duration"
              },
              "calculation_mode": null
            },
            "name": "Treadmill Jog",
            "slug": "treadmill-jog",
            "featured_weight": 1
          },
          "fatigue": [
            {
              "muscle_name": "calves",
              "fatigue": 1.0,
              "daily_gradient": "#f4f7fa",
              "weekly_gradient": "#f4f7fa"
            },
            {
              "muscle_name": "glutes",
              "fatigue": 1.0,
              "daily_gradient": "#fafdb8",
              "weekly_gradient": "#f4f7fa"
            },
            {
              "muscle_name": "hamstrings",
              "fatigue": 1.0,
              "daily_gradient": "#ffcc99",
              "weekly_gradient": "#f4f7fa"
            },
            {
              "muscle_name": "quads",
              "fatigue": 0.67,
              "daily_gradient": "#ffffcc",
              "weekly_gradient": "#f4f7fa"
            }
          ],
          "reps": "10-min",
          "sets": {
            "regular": 1,
            "warmup": 1
          }
        }
      ],
      "body_map": [
        {
          "muscle_name": "calves",
          "daily_gradient": "#fafdb8",
          "weekly_gradient": "#f4f7fa"
        },
        {
          "muscle_name": "glutes",
          "daily_gradient": "#ffcc66",
          "weekly_gradient": "#f4f7fa"
        },
        {
          "muscle_name": "hamstrings",
          "daily_gradient": "#ff0000",
          "weekly_gradient": "#ffffcc"
        },
        {
          "muscle_name": "quads",
          "daily_gradient": "#ffff99",
          "weekly_gradient": "#f4f7fa"
        },
        {
          "muscle_name": "anterior-deltoid",
          "daily_gradient": "#ff0000",
          "weekly_gradient": "#fafdb8"
        },
        {
          "muscle_name": "front-shoulders",
          "daily_gradient": "#ff0000",
          "weekly_gradient": "#f4f7fa"
        },
        {
          "muscle_name": "lateral-deltoid",
          "daily_gradient": "#ffcc66",
          "weekly_gradient": "#ffffcc"
        },
        {
          "muscle_name": "triceps",
          "daily_gradient": "#ff0000",
          "weekly_gradient": "#ffcc66"
        },
        {
          "muscle_name": "chest",
          "daily_gradient": "#ff0000",
          "weekly_gradient": "#ffffcc"
        }
      ]
    })
  }, []);

  const renderFatigueLevel = (level: number) => {
    if (level >= 3) return "High";
    if (level >= 2) return "Medium";
    if (level >= 1) return "Low";
    return "Very Low";
  };

  const getFatigueColor = (gradient: string) => {
    if (gradient === "#ff0000") return "bg-red-500";
    if (gradient === "#ffcc66") return "bg-amber-400";
    if (gradient === "#ffcc99") return "bg-orange-300";
    if (gradient === "#ffffcc") return "bg-yellow-200";
    if (gradient === "#fafdb8") return "bg-yellow-100";
    if (gradient === "#f4f7fa") return "bg-gray-100";
    return "bg-gray-200";
  };

  const renderExerciseCard = (exercise: any, index: any) => {
    const { exercise: exerciseData, fatigue, reps, sets } = exercise;

    return (
      <div key={index} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-3">
          <h3 className="text-lg font-bold">{exerciseData.name}</h3>
          <div className="text-sm">{exerciseData.category.name} • {exerciseData.difficulty.name}</div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Details</h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-sm text-gray-600">Reps:</div>
                <div className="text-sm font-medium">{reps}</div>

                <div className="text-sm text-gray-600">Sets:</div>
                <div className="text-sm font-medium">
                  {sets.regular} regular{sets.warmup > 0 ? `, ${sets.warmup} warmup` : ''}
                </div>

                {exerciseData.muscles_primary && exerciseData.muscles_primary.length > 0 && (
                  <>
                    <div className="text-sm text-gray-600">Primary Muscles:</div>
                    <div className="text-sm font-medium">
                      {exerciseData.muscles_primary.map((muscle: { name: string }) => muscle.name).join(', ')}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Fatigue Impact</h4>
              {fatigue.map((item: { muscle_name: string; daily_gradient: string; weekly_gradient: string; fatigue: number }, idx: React.Key | null | undefined) => (
                <div key={idx} className="flex items-center mb-2">
                  <div className="w-1/3 text-sm capitalize">{item.muscle_name.replace(/-/g, ' ')}</div>
                  <div className="w-1/3 flex items-center">
                    <div className={`w-6 h-6 rounded-full mr-2 ${getFatigueColor(item.daily_gradient)}`}></div>
                    <span className="text-sm">{renderFatigueLevel(item.fatigue)}</span>
                  </div>
                  {/* <div className="w-1/3 flex items-center">
					<div className={`w-6 h-6 rounded-full mr-2 ${getFatigueColor(item.weekly_gradient)}`}></div>
					<span className="text-sm text-gray-600">Weekly</span>
				  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBodyMap = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-bold mb-4">Body Fatigue Map</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {workoutData?.body_map?.map((muscle: { daily_gradient: string; weekly_gradient: string; muscle_name: string; }, index: React.Key | null | undefined) => (
            <div key={index} className="flex items-center p-2 border rounded">
              <div className="mr-2">
                <div className="flex items-center mb-1">
                  <div className={`w-4 h-4 rounded-full mr-2 ${getFatigueColor(muscle.daily_gradient)}`}></div>
                  <span className="text-sm">Daily</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${getFatigueColor(muscle.weekly_gradient)}`}></div>
                  <span className="text-sm">Weekly</span>
                </div>
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium capitalize">{muscle.muscle_name.replace(/-/g, ' ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-blue-900 to-blue-950'>


      <div className="max-w-6xl mx-auto px-4 py-6 ">
        <div className="mb-6 text-white">
          <h1 className="text-2xl font-bold  mb-2">Workout Plan</h1>
          <p className="">Your personalized workout routine with detailed exercise information</p>
        </div>

        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'exercises' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-white'}`}
              onClick={() => setActiveTab('exercises')}>
              Exercises
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'bodyMap' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-white'}`}
              onClick={() => setActiveTab('bodyMap')}>
              Body Map
            </button>
          </div>
        </div>

        {activeTab === 'exercises' ? (
          <div>
            {workoutData?.exercises.map((exercise, index) => renderExerciseCard(exercise, index))}
          </div>
        ) : (
          renderBodyMap()
        )}
      </div>
    </div>
  );
};

export default WorkoutDisplay;
