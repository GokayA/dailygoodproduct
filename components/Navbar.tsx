import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import DropMenu from './DropMenu';
import ProfileNav from './ProfileNav';
import SearchBar from './SearchBar';
import { Button, buttonVariants } from './ui/Button';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="container flex justify-between items-center h-20 min-w-full">
      <div className="flex gap-5">
        <div className="flex items-center">
          <Link href="/" className="flex gap-2 items-center">
            <div className="relative h-16 w-16">
              <Image
                src="/ppr.png"
                alt="Logo image"
                fill
                className="object-contain"
              />
            </div>

            <div className="sm:hidden flex justify-center items-center">
              <DropMenu />
            </div>
          </Link>
        </div>
        {/* Search bar */}
        <div className="flex bg-greenBlack border-borderShinyblue text-darkGray justify-center items-center p-4">
          <SearchBar />
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
          <a href="/post">
            <Button
              className="text-red-800 font-thin text-xl hover:no-underline hover:text-2xl sm:flex hidden"
              variant="link"
            >
              Submit
            </Button>
          </a>
        ) : null}

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
