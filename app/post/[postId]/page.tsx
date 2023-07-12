import CommentsSection from '@/components/CommentsSection';
import EditorOutput from '@/components/EditorOutput';
import PostVoteServer from '@/components/post-votes/PostVoteServer';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { formatTimeToNow } from '@/lib/utils';
import { CachedPost } from '@/types/redis';
import { Post, User, Vote } from '@prisma/client';
import { ArrowUp, Loader2 } from 'lucide-react';

import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

interface pageProps {
  params: {
    postId: string;
  };
}

const page = async ({ params }: pageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();

  return (
    <div className="text-darkGray container flex justify-center">
      <Suspense fallback={<PostVoteShell />}>
        <PostVoteServer
          postId={post?.id ?? cachedPost.id}
          getData={async () => {
            return await db.post.findUnique({
              where: {
                id: params.postId,
              },
              include: {
                votes: true,
              },
            });
          }}
        />
      </Suspense>
      <div className="w-full flex-1 p-4 rounded-sm">
        <p className="max-h-40 truncate text-xs text-lightSlateGray">
          Posted by {post?.author.username ?? cachedPost.authorUsername}{' '}
          {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
        </p>
        <h1 className="text-xl font-semibold py-3 leading-5 text-darkGray">
          {' '}
          {post?.title ?? cachedPost.title}
        </h1>
        <EditorOutput content={post?.content ?? cachedPost.content} />
        <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin" />}>
          <CommentsSection postId={post?.id ?? cachedPost.id} />
        </Suspense>
      </div>
    </div>
  );
};

function PostVoteShell() {
  return (
    <div className="items-center flex flex-col pr-6 w-20">
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowUp className="h-5 w-5 text-darkGray" />
      </div>
      <div className="text-center py-2 font-medium">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
    </div>
  );
}

export default page;
