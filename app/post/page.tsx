import Editor from '@/components/Editor';
import { Button } from '@/components/ui/Button';

const page = ({}) => {
  return (
    <div className="m-4 flex flex-col items-start gap-5">
      <h2 className="text-3xl font-semibold leading-8 text-darkGray">
        Share your Product and your opinions!
      </h2>

      {/* form */}
      <Editor />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="post-form">
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
