import { authOptions } from '@/lib/auth';
import { Link2 } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
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
            <Link2 className="h-8 w-8 sm:h-6 sm:w-6" />
            <p className="hidden text-lightSlateGray hover:text-red-500 text-sm font-medium md:block">
              PPC
            </p>
          </Link>
        </div>
        {/* Search bar */}
        <div className="">
          <Input placeholder="Search" className="hidden sm:flex" />
        </div>
        <div className="flex items-center gap-5">
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
              className={`${buttonVariants({
                variant: 'secondary',
              })} text-base font-normal bg-red-800 text-white hover:text-black`}
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
