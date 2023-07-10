import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { toast } from './use-toast';

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'Please login to do that.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href="/sign-in"
          className={buttonVariants()}
        >
          Login
        </Link>
      ),
    });
  };
  return { loginToast };
};
