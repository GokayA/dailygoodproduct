import { Search } from 'lucide-react';
import { FC } from 'react';
import { Input } from './ui/Input';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="container flex justify-between items-center h-20  min-w-full">
      <div className="flex gap-5">
        <div className="flex items-center">
          <p className="text-base text-lightSlateGray">Logo</p>
        </div>
        <div className="">
          <Input placeholder="Search" className="hidden sm:flex" />
        </div>
        <div className="flex items-center gap-5">
          <p className="text-base text-lightSlateGray">Products</p>
          <p className="text-base text-lightSlateGray">About</p>
        </div>
      </div>
      <div className="flex gap-5">
        <p className="text-base text-lightSlateGray">Sign in</p>
        <p className="text-base text-lightSlateGray">Sign up</p>
      </div>
    </div>
  );
};

export default Navbar;
