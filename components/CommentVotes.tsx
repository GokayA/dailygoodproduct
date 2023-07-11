'use client';
import { useCustomToast } from '@/hooks/use-custom-toasts';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CommentVoteRequest } from '@/lib/validators/vote';
import { usePrevious } from '@mantine/hooks';
import { CommentVote, VoteType } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ArrowUp } from 'lucide-react';
import { FC, useState } from 'react';
import { Button } from './ui/Button';

type PartialVote = Pick<CommentVote, 'type'>;

interface CommentVoteProps {
  commentId: string;
  votesAmt: number;
  currentVote?: PartialVote;
}

const CommentVote: FC<CommentVoteProps> = ({
  votesAmt: _votesAmt,
  commentId,
  currentVote: _currentVote,
}) => {
  const { loginToast } = useCustomToast();
  const [votesAmt, setVotesAmt] = useState<number>(_votesAmt);
  const [currentVote, setCurrentVote] = useState<PartialVote | undefined>(
    _currentVote
  );
  const prevVote = usePrevious(currentVote);
  //make sure votes sync

  //voting Functionality

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: CommentVoteRequest = {
        voteType,
        commentId,
      };
      await axios.patch(`/api/products/comment/vote`, payload);
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
      if (currentVote?.type === type) {
        setCurrentVote(undefined);
        if (type === 'UP') setVotesAmt((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
      } else {
        setCurrentVote({ type });
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN')
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex gap-1">
      <Button
        onClick={() => vote('UP')}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowUp
          className={cn('text-darkGray pt-2', {
            'text-emerald-500 fill-emeral-500 ': currentVote?.type === 'UP',
          })}
        />
      </Button>
      <p className="text-lightSlateGray pb-2">{votesAmt}</p>
    </div>
  );
};
export default CommentVote;
