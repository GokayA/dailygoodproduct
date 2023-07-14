import Link from 'next/link';
import { FC } from 'react';
import { Separator } from './ui/Seperator';
interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <>
      <Separator className="bg-borderShinyblue my-5 " />
      <div className="flex justify-between text-lightSlateGray container text-sm pb-2">
        <div className="">Copyright © 2023 - Pro Review Product</div>
        <div className="flex gap-3">
          <Link href="https://twitter.com">Twitter</Link>
          <Link href="https://instagram.com">Instagram</Link>
          <Link href="https://github.com">Github</Link>
          <Link href="https://linkedin.com">LinkedIn</Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
