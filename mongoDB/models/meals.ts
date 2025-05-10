import mongoose, { Model, Schema, Types } from "mongoose";


export interface mealsBase {
  // workoutPlanId: string,
  recipe: object
  mealType: "Breakfast" | "Lunch" | "Dinner"
}

export interface meals extends Document, mealsBase {
  _id: Types.ObjectId; // <-- ADD THIS
  createdAt: Date;
  updatedAt: Date;
}

const mealsSchema = new Schema<meals>(
  {
    recipe: { type: Object, required: true },
    mealType: { type: String, required: true, enum: ["Breakfast", "Lunch", "Dinner"] },
  },
  {
    timestamps: true,
  }
);


export const meals: Model<meals> = (mongoose.models?.meals as Model<meals>) || mongoose.model<meals>('meals', mealsSchema);

