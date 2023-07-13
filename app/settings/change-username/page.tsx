import UserNameForm from '@/components/UserNameForm';
import { authOptions, getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FC } from 'react';

export const metadata = {
  title: 'Pro Review Product | Settings',
  description: 'Manage account',
};
interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect(authOptions.pages?.signIn || `/sign-in`);
  }

  return (
    <div className="max-w-4xl">
      <div className="grid items-start gap-5">
        <h1 className="text-white py-12  text-4xl leading-6">
          Change Username
        </h1>
      </div>
      <div className="grid gap-8">
        <UserNameForm
          user={{ id: session.user.id, username: session.user.username || '' }}
        />
      </div>
    </div>
  );
};

export default page;
