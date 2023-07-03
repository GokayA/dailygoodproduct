import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Link2 } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import DropMenu from './DropMenu';
import ProfileNav from './ProfileNav';
import { buttonVariants } from './ui/Button';
import { Input } from './ui/Input';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="container flex justify-between items-center h-20  min-w-full">
      <div className="flex gap-5">
        <div className="flex items-center">
          <Link href="/" className="flex gap-2 items-center">
            <Link2 className="h-7 w-7 sm:h-10 sm:w-10  text-lightSlateGray" />
            <p className="hidden text-lightSlateGray hover:text-red-500 text-base font-medium md:block">
              PPC
            </p>
            <div className="sm:hidden flex justify-center items-center">
              <DropMenu />
            </div>
          </Link>
        </div>
        {/* Search bar */}
        <div className="">
          <Input placeholder="Search" className="hidden sm:flex" />
        </div>
        <div className="sm:flex items-center gap-5 hidden">
          <Link
            href="/products"
            className="text-base text-lightSlateGray hover:text-red-500"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-base text-lightSlateGray hover:text-red-500"
          >
            About
          </Link>
        </div>
      </div>
      <div className="flex gap-5">
        {session?.user ? (
          <ProfileNav user={session.user} />
        ) : (
          <>
            <Link
              href="/sign-in"
              className={`${buttonVariants({
                variant: 'ghost',
              })} text-base text-lightSlateGray`}
            >
              Sign in
            </Link>
            <Link
              href="/sign-in"
              className={`${buttonVariants()}, text-base font-normal hover:bg-white bg-red-800 text-white hover:text-black`}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
