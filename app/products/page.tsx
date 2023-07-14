import Greeting from '@/components/Greeting';
import TopPostFeed from '@/components/top-post-feed/TopPostFeed';
import { Separator } from '@/components/ui/Seperator';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';

export default async function Home() {
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
    <div className="grid grid-rows-1 grid-cols-3 gap-4 md:container ">
      <div className="md:col-span-3 col-span-3">
        <Greeting />
      </div>
      <div className="grid row-span-3 md:row-span-2 col-span-3 md:col-span-3 gap-4 ">
        <Separator className="mb-10 bg-borderShinyblue" />
        <div className="max-lg:container  ">
          <h1 className="text-darkGray pb-8 text-2xl">Top Rated Products</h1>
          <TopPostFeed className="h-24 w-24" initialPosts={topPosts} />
        </div>
      </div>
    </div>
  );
}
