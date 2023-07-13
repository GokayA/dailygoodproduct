import Image from 'next/image';
import UserAuthForm from './UserAuthForm';

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 justify-center items-center text-center">
        <div className="relative w-24 h-24">
          <Image
            src="/ppr.png"
            alt="logo image"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-darkGray">
          Welcome to Pro Review Product
        </h1>
        <p className="max-w-xs mx-auto text-lightSlateGray">
          Join our community and unlock a world of shared product reviews,
          opinions, and discoveries.
        </p>
      </div>
      <UserAuthForm />
    </div>
  );
};

export default SignIn;
