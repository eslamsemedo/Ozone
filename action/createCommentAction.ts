"use server";

// import { AddCommentRequestBody } from "@/app/api/posts/[post_id]/comments/route";


import { ICommentBase } from "@/mongoDB/models/comment";
import { Post } from "@/mongoDB/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export default async function createCommentAction(
  postId: string,
  formData: FormData
) {
  const user = await currentUser();

  const commentInput = formData.get("commentInput") as string;

  if (!postId) throw new Error("Post id is required");
  if (!commentInput) throw new Error("Comment input is required");
  if (!user?.id) throw new Error("User not authenticated");

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  const body: AddCommentRequestBody = {
    user: userDB,
    text: commentInput,
  };

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }


  try {
    await post.commentOnPost(body);
    revalidatePath("/");
  } catch (error) {
    throw new Error("An error occurred while adding comment");
  }
}
