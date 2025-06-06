import { IPostDocument } from '@/mongoDB/models/post'
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import moment from 'moment';
import React from 'react'

export default function CommentFeed({ post }: { post: IPostDocument }) {

  const { user } = useUser();

  const isAuthor = user?.id === post.user.userId;

  return (
    <div className="mt-3 space-y-2">
      {post?.comments?.map((comment: any) => (
        <div key={String(comment._id)} className="flex space-x-1 items-center border border-blue-900 rounded-2xl">
          <Avatar className='w-10'>
            <AvatarImage className='rounded-md' src={comment.user.userImage} />
            <AvatarFallback>
              {comment.user.firstName?.charAt(0)}
              {comment.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="bg-gray-100 px-4 py-2 rounded-md w-full sm:w-auto md:min-w-[300px]">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {comment.user.firstName} {comment.user.lastName}
                </p>
                <p className="text-xs text-gray-400">
                  @{comment.user.firstName}
                  {comment.user.firstName}-
                  {comment.user.userId.toString().slice(-4)}
                </p>
              </div>

              <p className="text-xs text-gray-400">
                {/* <TimeAgo date={new Date(comment.createdAt)} /> */}
                {moment(new Date(post.createdAt)).fromNow()}
              </p>
            </div>

            <p className="mt-3 text-sm">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
