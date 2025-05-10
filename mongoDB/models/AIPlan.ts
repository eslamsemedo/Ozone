import mongoose, { Model, Schema, Types } from "mongoose";


export interface AIPlanBase {
  // workoutPlanId: string,
  workoutplan: object,
}

export interface AIPlan extends Document, AIPlanBase {
  _id: Types.ObjectId; // <-- ADD THIS
  createdAt: Date;
  updatedAt: Date;
}

const AIPlanSchema = new Schema<AIPlan>(
  {
    // workoutPlanId: { type: String, required: true, unique: true },
    workoutplan: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);


export const AIPlan: Model<AIPlan> = (mongoose.models?.aiplan as Model<AIPlan>) || mongoose.model<AIPlan>('aiplan', AIPlanSchema);

