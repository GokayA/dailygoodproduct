import { Post, User, Vote } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
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
            <ImageRenderer content={post.content} className="w-24 h-24" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-darkGray">{post.title}</p>
            <p className="text-lightSlateGray">{post.subtitle}</p>
            <div className="flex gap-2">
              <p className="hidden sm:flex text-xs sm:text-sm text-lightSlateGray">
                posted by {post.author.username}
              </p>
              <div className="sm:flex hidden">
                <p className="text-sm text-darkGray ">{commentAmt}</p>
                <MessageSquare className="text-darkGray mt-0.5 ml-2 w-3 h-3 sm:w-5 sm:h-5" />
              </div>
            </div>
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
