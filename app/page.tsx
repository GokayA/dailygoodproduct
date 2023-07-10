import FeaturedProductCard from '@/components/FeaturedProductCard';
import Greeting from '@/components/Greeting';
import PostFeed from '@/components/PostFeed';
import { Separator } from '@/components/ui/separator';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';

export default async function Home() {
  const posts = await db.post.findMany({
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
      <div className="sm:col-span-2 col-span-3">
        <Greeting />
      </div>
      <div className="hidden sm:block sm:col-start-3 sm:row-span-3 border-l border-borderShinyblue">
        <div className="container">
          <h1 className=" text-darkGray pb-8 ">Top products</h1>
          <p>Product</p>
        </div>
      </div>

      <div className="grid row-span-3 sm:row-span-2 col-span-3 sm:col-span-2 gap-4">
        <Separator className="mb-10 bg-borderShinyblue" />
        <h1 className="text-darkGray pb-8 text-2xl ">Todays products</h1>
        <PostFeed initialPosts={posts} />
      </div>
    </div>
  );
}
