import mongoose, { Model, Schema, Types } from "mongoose";


export interface IUserBase {
  userId: string;
  name: string;
  workoutPlanId: string[];
  dietPlanId: Number;
}

export interface IUser extends Document, IUserBase {
  _id: Types.ObjectId; // <-- ADD THIS
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    workoutPlanId: { type: [String], required: true },
    dietPlanId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export const User: Model<IUser> = (mongoose.models?.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);