'use client';
import { signIn } from 'next-auth/react';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const loginWithGoogle = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={loginWithGoogle}>Google</button>
    </div>
  );
};

export default page;
