'use client'

import Image from "next/image";
import { IPostDocument } from '@/mongoDB/models/post'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import moment from 'moment';
import PostOptions from "./postOptions";
import deletePostAction from "@/action/deletePostAction";
import toast from "react-hot-toast";
import { useState } from "react";


export default function Post({ post }: { post: IPostDocument }) {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()


  const isAuthor = user?.id == post.user.userId


  const handleDeletePost = async (postId: string) => {
    try {
      setLoading(true)
      await deletePostAction(postId);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setLoading(false)
    }
  };


  return (
    <>
      <div className="bg-[#eeeeee] rounded-md border">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
        <div className="p-4 flex space-x-2">
          <div>
            <Avatar>
              <AvatarImage src={post.user.userImage} />
              <AvatarFallback>
                {post.user.firstName?.charAt(0)}
                {post.user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex justify-between flex-1">
            <div>
              <div className="font-semibold">
                {post.user.firstName} {post.user.lastName}{" "}
                {isAuthor && (
                  <Badge className="ml-2" variant="secondary">
                    Author
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-400">
                @{post.user.firstName}
                {post.user.firstName}-{post.user.userId.toString().slice(-4)}
              </p>

              <span className="text-xs text-gray-400">
                {/* <ReactTimeago date={new Date(post.createdAt)} /> */}
                {/* <ReactTimeAgo date={new Date(post.createdAt)} /> */}
                {moment(new Date(post.createdAt)).fromNow()}
              </span>
            </div>

            {isAuthor && (
              <Button
                variant="outline"
                onClick={() => handleDeletePost(post._id.toString())}
                className="hover:bg-red-500 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <Trash2 />
              </Button>
            )}
          </div>
        </div>

        <div className="">
          <p className="px-4 pb-2 mt-2">{post.text}</p>

          {/* If image uploaded put it here... */}
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="Post Image"
              width={500}
              height={500}
              className="w-full mx-auto rounded-[5px] "
              priority
            />
          )}
        </div>

        <PostOptions postId={String(post._id)} post={post} />
      </div>
    </>
  )
}
