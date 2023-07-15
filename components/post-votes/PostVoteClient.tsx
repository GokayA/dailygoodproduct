'use client';
import { useCustomToast } from '@/hooks/use-custom-toasts';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { PostVoteRequest } from '@/lib/validators/vote';
import { usePrevious } from '@mantine/hooks';
import { VoteType } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ArrowUp } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Button } from '../ui/Button';

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  initialVotesAmt,
  postId,
  initialVote,
}) => {
  const { loginToast } = useCustomToast();
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);
  //make sure votes sync
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  //voting Functionality

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId,
      };
      await axios.patch(`/api/products/vote`, payload);
    },
    onError: (err, type) => {
      if (type === 'UP') setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);
      //reset
      setCurrentVote(prevVote);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: 'Something went wrong',
        description: 'Your vote not registered, try again',
        variant: 'destructive',
      });
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === 'UP') setVotesAmt((prev) => prev - 1);
      } else {
        setCurrentVote(type);
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="cursor-pointer border-borderShinyblue   flex flex-col items-center justify-between border border- text-center w-14 h-16 rounded-lg ">
      <Button
        onClick={() => vote('UP')}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowUp
          className={cn('text-darkGray pt-2', {
            'text-emerald-500 fill-emeral-500 ': currentVote === 'UP',
          })}
        />
      </Button>
      <p className="text-lightSlateGray pb-2">{votesAmt}</p>
    </div>
  );
};
export default PostVoteClient;
