import FeaturedProductCard from '@/components/FeaturedProductCard';
import Greeting from '@/components/Greeting';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div>
      <div className="container grid grid-rows-1 grid-flow-col gap-4 ">
        <div className="col-span-1">
          <Greeting />
        </div>
        <div className="col-start-2 row-span-3 border-l">
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
        <div className="row-span-2 col-span-1 ">
          <Separator className="mb-10" />
          <div className="container">
            <h1 className="text-darkGray pb-8 ">Todays products</h1>
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
      </div>
    </div>
  );
}
