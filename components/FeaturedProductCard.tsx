import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface FeaturedProductCardProps {}

const FeaturedProductCard: FC<FeaturedProductCardProps> = ({}) => {
  return (
    <div className="flex justify-between items-center cursor-pointer hover:border-t  hover:border-t-red-700 pr-2">
      <div className="flex gap-4 justify-between items-center ">
        <div className="relative w-24 h-24">
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
      <div className="cursor-pointer border-borderShinyblue hover:bg-slate-950  flex flex-col items-center justify-between border border- text-center w-14 h-16 rounded-lg ">
        <ArrowUp className="text-darkGray pt-2" />
        <p className="text-lightSlateGray pb-2">145</p>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
