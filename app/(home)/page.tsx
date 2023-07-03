import FeaturedProductCard from '@/components/FeaturedProductCard';
import Greeting from '@/components/Greeting';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="grid grid-rows-1 grid-cols-3 gap-4 ">
      <div className="col-span-2">
        <Greeting />
      </div>
      <div className="col-start-3 row-span-3 border-l">
        <div className="container">
          <h1 className=" text-darkGray pb-8 ">Top products</h1>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
        </div>
      </div>
      <div className="row-span-2 col-span-2 ">
        <Separator className="mb-10" />
        <h1 className="text-darkGray pb-8 text-2xl">Todays products</h1>
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
        <FeaturedProductCard />
      </div>
    </div>
  );
}
