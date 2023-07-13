import { Post, User, Vote } from '@prisma/client';
import Link from 'next/link';
import ImageRenderer from '../ImageRenderer';
import PostVoteClient from '../post-votes/PostVoteClient';

type PartialVote = Pick<Vote, 'type'>;

interface TopPostCardProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };

  votesAmt: number;
  currentVote?: PartialVote;
  commentAmt: number;
}

const TopPostCard = ({
  post,
  commentAmt,
  votesAmt,
  currentVote,
}: TopPostCardProps) => {
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
            <div className="flex gap-2">
              <p className="text-sm text-lightSlateGray">
                posted by u/ {post.author.username}
              </p>
              <p className="text-sm text-white">{commentAmt} Comments</p>
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

export default TopPostCard;
