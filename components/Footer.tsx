import { getYear } from 'date-fns';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { Separator } from './ui/Seperator';

const Footer = () => {
  const date = getYear(new Date());

  return (
    <div className="flex flex-col ">
      <Separator className="bg-borderShinyblue my-5 container" />
      <div className="flex justify-between text-lightSlateGray container text-sm pb-10">
        <div className="pr-2"> {date}</div>
        <div className="flex gap-3">
          <div className="flex">
            <Link target="_blank" href="https://twitter.com">
              Twitter
            </Link>
            <Dot className="w-4" />
          </div>
          <div className="flex">
            <Link target="_blank" href="https://instagram.com">
              Instagram
            </Link>
            <Dot className="w-4 " />
          </div>
          <div className="flex">
            <Link target="_blank" href="https://github.com">
              Github
            </Link>
            <Dot className="w-4 " />
          </div>
          <div className="flex">
            <Link target="_blank" href="https://linkedin.com">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
