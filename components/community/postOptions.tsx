'use client'

import { IPostDocument } from '@/mongoDB/models/post'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { LikePostRequestBody } from '@/app/api/posts/[post_id]/like/route';
// import { UnlikePostRequestBody } from '@/app/api/posts/[post_id]/unlike/route';
import CommentForm from './commentForm';
import CommentFeed from './commentFeed';
export interface LikePostRequestBody {
  userId: string;
}
export interface UnlikePostRequestBody {
  userId: string;
}

export default function PostOptions({ postId, post }: { postId: string, post: IPostDocument }) {

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    if (user?.id && post?.likes?.includes(user.id)) {
      setLiked(true)
    }
  }, [post, user])

  const likeOrUnlikePost = async () => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes?.filter((like: any) => like !== user.id)
      : [...(likes ?? []), user.id];

    const body: LikePostRequestBody | UnlikePostRequestBody = {
      userId: user.id,
    };

    setLiked(!liked);
    setLikes(newLikes);

    const response = await fetch(
      `/api/posts/${postId}/${liked ? "unlike" : "like"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body }),
      }
    );

    if (!response.ok) {
      setLiked(originalLiked);
      throw new Error("Failed to like post");
    }

    const fetchLikesResponse = await fetch(`/api/posts/${postId}/like`);
    if (!fetchLikesResponse.ok) {
      setLikes(originalLikes);
      throw new Error("Failed to fetch likes");
    }

    const newLikesData = await fetchLikesResponse.json();

    setLikes(newLikesData);
  };

  return (
    <div className="">
      <div className="flex justify-between p-4">
        <div>
          {likes && likes.length > 0 && (
            <p className="text-xs text-gray-500 cursor-pointer hover:underline">
              {likes.length} likes
            </p>
          )}
        </div>

        <div>
          {post?.comments && post.comments.length > 0 && (
            <p
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="text-xs text-gray-500 cursor-pointer hover:underline"
            >
              {post.comments.length} comments
            </p>
          )}
        </div>
      </div>

      <div className="flex p-2 justify-evenly px-2 border-t">
        <Button
          variant="ghost"
          className="postButton hover:text-[#4881c2] hover:fill-[#4881c2] transition-colors duration-300 cursor-pointer"
          onClick={likeOrUnlikePost}
        >
          {/* If user has liked the post, show filled thumbs up icon */}
          <ThumbsUpIcon
            className={cn("mr-1", liked && "text-[#4881c2] fill-[#4881c2]")}
          />
          Like
        </Button>

        <Button
          variant="ghost"
          className="postButton hover:text-[#47816c] hover:fill-[#47816c] transition-colors duration-300 cursor-pointer"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        >
          <MessageCircle
            className={cn(
              "mr-1",
              isCommentsOpen && "text-[#47816c] fill-[#47816c]"
            )}
          />
          Comment
        </Button>

      
      </div>

      {isCommentsOpen && (
        <div className="p-4">
          {user?.id && <CommentForm postId={postId} />}
          <CommentFeed post={post} />
        </div>
      )}
    </div>

  )
}
