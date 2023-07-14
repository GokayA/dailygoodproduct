import { Dot } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { Separator } from './ui/Seperator';
interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <>
      <Separator className="bg-borderShinyblue my-5 container" />
      <div className="flex justify-between text-lightSlateGray container text-sm pb-2">
        <div className="">Copyright © 2023 - Pro Review Product</div>
        <div className="flex gap-3">
          <div className="flex">
            <Link href="https://twitter.com">Twitter</Link>
            <Dot className="w-4" />
          </div>
          <div className="flex">
            <Link href="https://instagram.com">Instagram</Link>
            <Dot className="w-4 " />
          </div>
          <div className="flex">
            <Link href="https://github.com">Github</Link>
            <Dot className="w-4 " />
          </div>
          <div className="flex">
            <Link href="https://linkedin.com">LinkedIn</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
