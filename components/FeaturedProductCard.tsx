import { db } from '@/lib/db';
import { Post, User, Vote } from '@prisma/client';
import { ArrowUp, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import ImageRenderer from './ImageRenderer';

type PartialVote = Pick<Vote, 'type'>;

interface FeaturedProductCardProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };

  // votesAmt: number;
  // currentVote?: PartialVote;
  commentAmt: number;
}

const FeaturedProductCard = ({
  post,
  commentAmt,
}: FeaturedProductCardProps) => {
  return (
    <div className="flex justify-between items-center cursor-pointer hover:border-t  hover:border-t-red-700 pr-2">
      <div className="flex gap-4 justify-between items-center ">
        <div className="relative w-24 h-24">
          <ImageRenderer content={post.content} />
        </div>
        <div className="flex flex-col gap-3">
          <a href={post.id}>
            <p className="text-darkGray">{post.title}</p>
            <p className="text-lightSlateGray">subtitle</p>
          </a>
          <a href={post.id} className="text-sm text-borderShinyblue">
            {commentAmt} Comments
          </a>
        </div>
      </div>
      <div className="cursor-pointer border-borderShinyblue hover:bg-slate-950  flex flex-col items-center justify-between border border- text-center w-14 h-16 rounded-lg ">
        <ArrowUp className="text-darkGray pt-2" />

        <p className="text-lightSlateGray pb-2">145</p>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
