'use client';
import { formatTimeToNow } from '@/lib/utils';
import { Comment, CommentVote, User } from '@prisma/client';
import { FC, useRef } from 'react';
import UserAvatar from './UserAvatar';

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
}

const PostComment: FC<PostCommentProps> = ({ comment }) => {
  const commentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col" ref={commentRef}>
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-medium text-lightSlateGray">
            {comment.author.username}
          </p>
          <p className="max-h-40 truncate text-xs text-lightSlateGray">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-darkGray">{comment.text}</p>
    </div>
  );
};

export default PostComment;
