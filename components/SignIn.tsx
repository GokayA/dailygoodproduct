import UserAuthForm from './UserAuthForm';

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        LOGO
        <h1 className="text-2xl font-semibold tracking-tight text-darkGray">
          Welcome
        </h1>
        <p className=" max-w-xs mx-auto text-lightSlateGray">
          Join our community and unlock a world of shared product reviews,
          opinions, and discoveries.
        </p>
      </div>
      <UserAuthForm />
    </div>
  );
};

export default SignIn;
