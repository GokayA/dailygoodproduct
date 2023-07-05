import { User } from '@prisma/client';

import Image from 'next/image';
import { FC } from 'react';

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image'>;
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  return (
    <div>
      {user.image ? (
        <div className="relative aspect-square h-14 w-14">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <span>Hello</span>
      )}
    </div>
  );
};

export default UserAvatar;
