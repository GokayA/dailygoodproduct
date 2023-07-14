import { getAuthSession } from '@/lib/auth';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/Dropdown-menu';

const DropMenu = async () => {
  const session = await getAuthSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="h-7 w-7 sm:h-10 sm:w-10 text-lightSlateGray" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          {session?.user ? <Link href="/post">Submit</Link> : null}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/products">Products</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/about">About</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropMenu;
