import Greeting from '@/components/Greeting';
import PostFeed from '@/components/PostFeed';
import TopPostFeed from '@/components/top-post-feed/TopPostFeed';
import { Separator } from '@/components/ui/Seperator';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';

export default async function Home() {
  const lastPosts = await db.post.findMany({
    include: {
      author: true,
      comments: true,
      votes: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });
  const topPosts = await db.post.findMany({
    include: {
      votes: true,
      author: true,
      comments: true,
      _count: {
        select: {
          votes: true,
        },
      },
    },
    orderBy: {
      votes: {
        _count: 'desc',
      },
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });
  return (
    <div className="p-1 grid grid-rows-1 grid-cols-3 gap-4 ">
      <div className="lg:col-span-2 col-span-3">
        <Greeting />
      </div>
      <div className="hidden lg:block lg:col-start-3 lg:row-span-3 border-l border-borderShinyblue">
        <div className="pl-2">
          <h1 className="text-darkGray pb-4 pl-4">Top products</h1>
          <TopPostFeed initialPosts={topPosts} className="h-16 w-16" />
        </div>
      </div>

      <div className="grid row-span-3 lg:row-span-2 col-span-3 lg:col-span-2 gap-4">
        <Separator className="mb-10 bg-borderShinyblue " />
        <div className="">
          <h1 className="text-darkGray pb-8 text-2xl ">Todays products</h1>
          <PostFeed initialPosts={lastPosts} />
        </div>
      </div>
    </div>
  );
}
