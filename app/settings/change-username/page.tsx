import UserNameForm from '@/components/UserNameForm';
import { COMPANY_NAME } from '@/config';
import { authOptions, getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: `${COMPANY_NAME}| Settings`,
  description: 'Change Username',
};

const page = async () => {
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
