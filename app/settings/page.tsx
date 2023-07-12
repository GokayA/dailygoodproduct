import UserNameForm from '@/components/UserNameForm';
import { authOptions, getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FC } from 'react';

export const metadata = {
  title: 'ProProductReview | Settings',
  description: 'Manage account',
};
interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect(authOptions.pages?.signIn || `/sign-in`);
  }

  return (
    <div className="">
      <div className="grid items-start gap-5">
        <h1 className="text-white">Settings</h1>
      </div>
      <div className="grid gap-8">
        <UserNameForm />
      </div>
    </div>
  );
};

export default page;
