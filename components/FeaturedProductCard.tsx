import { db } from '@/lib/db';
import { Post, User, Vote } from '@prisma/client';
import { ArrowUp, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ImageRenderer from './ImageRenderer';
import PostVoteClient from './post-votes/PostVoteClient';

type PartialVote = Pick<Vote, 'type'>;

interface FeaturedProductCardProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };

  votesAmt: number;
  currentVote?: PartialVote;
  commentAmt: number;
}

const FeaturedProductCard = ({
  post,
  commentAmt,
  votesAmt,
  currentVote,
}: FeaturedProductCardProps) => {
  return (
    <div className="flex justify-between items-center cursor-pointer hover:border-t  hover:border-t-red-700 pr-2">
      <Link href={`/post/${post.id}`}>
        <div className="flex gap-4 justify-between items-center ">
          <div className="relative w-24 h-24">
            <ImageRenderer content={post.content} />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-darkGray">{post.title}</p>
            <p className="text-lightSlateGray">subtitle</p>
            <p className="text-sm text-borderShinyblue">
              {commentAmt} Comments
            </p>
          </div>
        </div>
      </Link>
      <PostVoteClient
        initialVote={currentVote?.type}
        initialVotesAmt={votesAmt}
        postId={post.id}
      />
    </div>
  );
};

export default FeaturedProductCard;
