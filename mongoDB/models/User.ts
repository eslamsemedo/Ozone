import mongoose, { Schema, Types } from "mongoose";

export interface IUserBase {
  userId: number;
  name: string;
  workoutPlan: boolean;
  dietPlan: boolean;
}

export interface IUser extends Document, IUserBase {
  _id: Types.ObjectId; // <-- ADD THIS
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    userId: { type: Number, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);