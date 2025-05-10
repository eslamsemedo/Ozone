'use server';
import connectDB from "@/mongoDB/db";
import { IUserBase, User } from "@/mongoDB/models/User";
import { currentUser } from "@clerk/nextjs/server";

export async function checkDatabase() {
  await connectDB();

  const loginUser = await currentUser(); // get Clerk user
  if (!loginUser) return;

  const id = loginUser?.id;
  if (!id) return;

  // Check if user exists in your DB
  const existingUser = await User.findOne({ userId: id });

  // console.log("Existing User:", existingUser);

  if (!existingUser) {
    let user: IUserBase = {
      userId: id,
      name: loginUser?.firstName || "Unknown",
      workoutPlanId: [],
      dietPlanId: 0
    };
    // Create new user
    try {
      await User.create(user)
      console.log("Created New User:", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
    // await User.findOneAndUpdate({ email: "test@example.com" }, { age: 31 }, { new: true })
  }
}