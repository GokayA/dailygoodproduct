import Greeting from '@/components/Greeting';
import PostFeed from '@/components/PostFeed';
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

  return (
    <div className="grid grid-rows-1 grid-cols-3 gap-4 ">
      <div className="md:col-span-2 col-span-3">
        <Greeting />
      </div>
      <div className="hidden md:block md:col-start-3 md:row-span-3 border-l border-borderShinyblue">
        <div className="pl-2">
          <h1 className="text-darkGray pb-8 pl-4">Top products</h1>
          <PostFeed initialPosts={lastPosts} />
        </div>
      </div>

      <div className="grid row-span-3 md:row-span-2 col-span-3 md:col-span-2 gap-4">
        <Separator className="mb-10 bg-borderShinyblue w-screen md:w-full" />
        <div className="max-md:container">
          <h1 className="text-darkGray pb-8 text-2xl ">Todays products</h1>
          <PostFeed initialPosts={lastPosts} />
        </div>
      </div>
    </div>
  );
}
