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
        <div className="relative h-10 w-10 aspect-square">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
            className="rounded-full"
          />
        </div>
      ) : (
        <span>Hello</span>
      )}
    </div>
  );
};

export default UserAvatar;
