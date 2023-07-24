import { COMPANY_NAME } from '@/config';
import { Github, Instagram, Linkedin, Minus, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-10  pt-8">
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
          About {COMPANY_NAME}
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-lightSlateGray">
          {COMPANY_NAME} your daily source for the best new Amazon products.
        </p>
        <p className="max-w-3xl mx-auto text-xl text-lightSlateGray">
          Discover and decide on the top products to buy, and be the first to
          access the best daily offerings.
        </p>
        <div className="flex pt-20 text-lightSlateGray">
          <div className="flex">
            <Link
              target="_blank"
              className="text-lg"
              href="https://twitter.com"
            >
              <Twitter className="w-10 hover:h-8 " />
            </Link>
            <Minus className="w-6" />
          </div>
          <div className="flex">
            <Link target="_blank" className="flex" href="https://instagram.com">
              <Instagram className="w-10 hover:h-8" />
            </Link>
            <Minus className="w-6" />
          </div>
          <div className="flex">
            <Link target="_blank" className="flex" href="https://linkedin.com">
              <Linkedin className="w-10 hover:h-8" />
            </Link>
            <Minus className="w-6" />
          </div>
          <div className="flex">
            <Link target="_blank" className="flex" href="https://github.com">
              <Github className="w-10 hover:h-8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
