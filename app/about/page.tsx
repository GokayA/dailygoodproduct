import Image from 'next/image';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 pt-8">
      <div className="flex flex-col space-y-2 justify-center items-center text-center">
        <div className="relative w-36 h-36">
          <Image
            src="/ppr.png"
            alt="logo image"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-darkGray">
          About Pro Review Product
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-lightSlateGray">
          Pro Review Product your daily source for the best new Amazon products.
        </p>
        <p className="max-w-3xl mx-auto text-xl text-lightSlateGray">
          Discover and decide on the top products to buy, and be the first to
          access the best daily offerings.
        </p>
      </div>
    </div>
  );
};

export default page;
