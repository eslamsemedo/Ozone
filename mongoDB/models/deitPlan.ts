import mongoose, { Model, Schema, Types } from "mongoose";

interface dayMeal {
  breakfastId: String,
  lunchId: String,
  dinnerId: String,
}

export interface deitPlanBase {
  // workoutPlanId: string,
  userId: string,
  day_1: dayMeal,
  day_2: dayMeal,
  day_3: dayMeal,
  day_4: dayMeal,
  day_5: dayMeal,
  day_6: dayMeal,
  day_7: dayMeal,
}

export interface deitPlan extends Document, deitPlanBase {
  _id: Types.ObjectId; // <-- ADD THIS
  createdAt: Date;
  updatedAt: Date;
}

const daySechema = new Schema({
  breakfastId: { type: String, required: true },
  lunchId: { type: String, required: true },
  dinnerId: { type: String, required: true },
});

const deitPlanSchema = new Schema<deitPlan>(
  {
    // workoutPlanId: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    day_1: daySechema,
    day_2: daySechema,
    day_3: daySechema,
    day_4: daySechema,
    day_5: daySechema,
    day_6: daySechema,
    day_7: daySechema,
  },
  {
    timestamps: true,
  }
);


export const deitPlan: Model<deitPlan> = (mongoose.models?.deitPlan as Model<deitPlan>) || mongoose.model<deitPlan>('deitPlan', deitPlanSchema);

