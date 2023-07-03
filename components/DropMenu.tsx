import { Menu } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/Dropdown-menu';

interface DropMenuProps {}

const DropMenu: FC<DropMenuProps> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="h-7 w-7 sm:h-10 sm:w-10 text-lightSlateGray" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/search">Search</Link>
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
