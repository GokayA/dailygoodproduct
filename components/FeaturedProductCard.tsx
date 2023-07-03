import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface FeaturedProductCardProps {}

const FeaturedProductCard: FC<FeaturedProductCardProps> = ({}) => {
  return (
    <div className="flex justify-between pb-5 ">
      <div className="flex gap-4 ">
        <div className="relative w-20 h-20 ">
          <Image
            src="placeholder.svg"
            alt="placeholder"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-darkGray">Title</p>
          <p className="text-lightSlateGray">Subtitle</p>
        </div>
      </div>
      <div className="cursor-pointer border-lightSlateGray hover:bg-slate-950  flex flex-col items-center justify-between border border- text-center w-14 h-16 rounded-lg">
        <ArrowUp className="text-darkGray pt-2" />
        <p className="text-lightSlateGray pb-2">145</p>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
