'use client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { FC, useState } from 'react';
import { Icons } from './Icons';
import { Button } from './ui/Button';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      signIn('google');
    } catch (error) {
      toast({
        title: 'error',
        description: 'There was an error while signing in',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn('flex justify-center ', className)} {...props}>
      <Button
        isLoading={isLoading}
        type="button"
        size="sm"
        variant="outline"
        className="w-full bg-transparent text-darkGray hover:bg-lightSlateGray"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2 " />}
        Sign in with Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
