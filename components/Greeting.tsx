import { COMPANY_NAME } from '@/config';

const Greeting = () => {
  return (
    <div className="border rounded-md border-borderShinyblue container max-w-7xl mx-auto h-full">
      <h1 className="text-darkGray pt-12">Welcome to {COMPANY_NAME}!</h1>
      <p className="text-lightSlateGray pb-6">
        The place to find best amazon products for you.
      </p>
    </div>
  );
};

export default Greeting;
