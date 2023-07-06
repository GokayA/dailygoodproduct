import Editor from '@/components/Editor';
import { Button } from '@/components/ui/Button';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <div>Create your product post</div>
      {/* form */}
      <div>
        <Editor subredditId="123" />
      </div>
      <div>
        <Button type="submit" form="post-form">
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
