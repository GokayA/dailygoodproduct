'use client';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { ExtendedPost } from '@/types/db';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useRef } from 'react';
import FeaturedProductCard from './FeaturedProductCard';

interface PostFeedProps {
  initialPosts: ExtendedPost[];
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts }) => {
  const { data: session } = useSession();
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['useInfinite-query'],
    async ({ pageParam = 1 }) => {
      const query = `/api/products/last-post/fetch?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);
  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="space-y-6">
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1;
          return acc;
        }, 0);
        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user.id
        );
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <FeaturedProductCard
                commentAmt={post.comments.length}
                post={post}
                currentVote={currentVote}
                votesAmt={votesAmt}
              />
            </li>
          );
        } else {
          return (
            <FeaturedProductCard
              commentAmt={post.comments.length}
              post={post}
              key={post.id}
              currentVote={currentVote}
              votesAmt={votesAmt}
            />
          );
        }
      })}
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="animate-spin text-borderShinyblue" />
        </li>
      )}
    </ul>
  );
};

export default PostFeed;
