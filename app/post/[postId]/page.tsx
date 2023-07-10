import EditorOutput from '@/components/EditorOutput';
import { db } from '@/lib/db';
import { Post, User, Vote } from '@prisma/client';

interface pageProps {
  params: {
    postId: string;
  };
}

const page = async ({ params }: pageProps) => {
  let post: (Post & { votes: Vote[]; author: User }) | null = null;
  post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      votes: true,
      author: true,
    },
  });

  return (
    <div className="text-darkGray container">
      <EditorOutput content={post?.content} />
    </div>
  );
};

export default page;
