// export interface IUserBase {
//   userId: string;
//   name: string;
//   workoutPlanId: number;
//   dietPlanId: number;
// }

// export interface workoutPlanBase {
//   // workoutPlanId: string,
//   workout_1: object,
//   workout_2: object,
//   workout_3: object,
//   workout_4: object,
//   workout_5: object,
//   workout_6: object,
// }

// Enums or Types
interface Muscle {
  id: number;
  name: string;
  name_en_us: string;
  scientific_name: string | null;
  url_name: string;
  description: string;
  description_en_us: string;
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
  name_en_us: string;
  url_name: string;
  description: string;
  description_en_us: string;
}

interface Mechanic {
  id: number;
  name: string;
  name_en_us: string;
  url_name: string;
  description: string;
  description_en_us: string;
}

interface Image {
  id: number;
  order: number;
  dst_link: string;
  src_image: string;
  branded_video: string;
  og_image: string;
  original_video?: string | null;
  unbranded_video?: string | null;
  gender?: number;
  exercise?: number;
}

interface LongFormContent {
  id: number;
  gender: {
    id: number;
    name: string;
    name_en_us: string;
  };
  youtube_link: string;
  exercise: number;
}

interface CorrectStep {
  id: number;
  order: number;
  text: string;
  text_en_us: string;
  exercise: number;
}

interface FullMeasure {
  id: number;
  measure: {
    id: number;
    name: string;
    units: {
      id: number;
      name: string;
    }[];
  };
  denominator: {
    id: number;
    name: string;
    units: any[];
  };
  calculation_mode: {
    id: number;
    name: string;
    description: string;
  };
}



interface BodyMapImage {
  id: number;
  gender: {
    id: number;
    name: string;
    name_en_us: string;
  };
  kind: string;
  dark_mode: boolean;
  front: string;
  back: string;
  exercise: number;
}

interface ExerciseUrls {
  male: string;
  female: string;
}

interface QrCodeEntry {
  male?: string;
  female?: string;
}

// Main Exercise Interface
export interface Exercise {
  id: number;
  name: string;
  name_en_us: string;
  name_alternative: string | null;
  slug: string;
  description: string;
  description_en_us: string;
  need_warmup: boolean;
  advanced_weight: number;
  featured_weight: number;
  weight: number;
  impact: number;
  use_youtube_links: boolean;
  featured: boolean;
  sponsered_link: boolean;
  sharing_hash: string | null;
  exercise_to_copy: number | null;
  status: string;
  muscles: Muscle[];
  muscles_primary: Muscle[];
  muscles_secondary: Muscle[];
  muscles_tertiary: Muscle[];
  grips: Grip[];
  category: Category;
  additional_categories: any[];
  difficulty: Difficulty;
  force: Force;
  mechanic: Mechanic;
  images: {
    male: Image[];
    female: Image[];
  };
  long_form_content: LongFormContent[];
  correct_steps: CorrectStep[];
  variation_of: number | null;
  variations: any[];
  seo_tags: string[];
  target_url: ExerciseUrls;
  male_images: Image[];
  female_images: Image[];
  full_measure: FullMeasure;
  body_map_images: BodyMapImage[];
  urls: ExerciseUrls;
  qr_code: QrCodeEntry[];
  joints: any[];
}


// Units used in full_measure
interface Unit {
  id: number;
  name: string;
}



// Image and video resources
interface ImageResource {
  id: number;
  order: number;
  dst_link: string | null;
  src_image: string | null;
  og_image: string;
  original_video: string | null;
  unbranded_video: string | null;
  branded_video: string | null;
  gender: number;
  exercise: number;
}

// Exercise category
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

// Difficulty
interface Difficulty {
  id: number;
  name: string;
  name_en_us: string;
}

// Exercise core
interface ExerciseCore {
  id: number;
  name: string;
  slug: string;
  muscles_primary: Muscle[];
  category: Category;
  difficulty: Difficulty;
  male_images: ImageResource[];
  female_images: ImageResource[];
  full_measure: FullMeasure;
  featured_weight: number;
}

// Fatigue structure
interface FatigueEntry {
  muscle_name: string;
  fatigue: number;
  daily_gradient: string;
  weekly_gradient: string;
}

// Sets and reps
interface Sets {
  regular: number;
  warmup: number;
}

// Exercise entry in exercises array
interface ExerciseEntry {
  exercise: ExerciseCore;
  fatigue: FatigueEntry[];
  reps: string;
  sets: Sets;
}

// Body map muscle entry
interface BodyMapEntry {
  muscle_name: string;
  daily_gradient: string;
  weekly_gradient: string;
}

// Entire response structure
export interface WorkoutData {
  exercises: ExerciseEntry[];
  body_map: BodyMapEntry[];
}