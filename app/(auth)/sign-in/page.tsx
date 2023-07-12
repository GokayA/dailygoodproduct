import SignIn from '@/components/SignIn';

const page = () => {
  return (
    <div className="absolute inset-0 overflow-hidden max-w-2xl mx-auto flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <SignIn />
      </div>
    </div>
  );
};

export default page;
