'use client';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserAvatar from './UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/Dropdown-menu';

interface ProfileNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>;
}

const ProfileNav = ({ user }: ProfileNavProps) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-greenBlack text-lightSlateGray border-none font-medium">
        <div className="flex items-center justify-start pl-1">
          <div className="flex flex-col truncate text-sm text-white/60 font-thin">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-borderShinyblue" />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => {
            router.push('/settings/change-username');
          }}
        >
          Change Username
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => {
            router.push(`/settings/your-history`);
          }}
        >
          Your History
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileNav;
