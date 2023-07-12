'use client';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { UsernameRequest, UsernameValidator } from '@/lib/validators/username';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'username'>;
}

const UserNameForm: FC<UserNameFormProps> = ({ user, className, ...props }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameRequest>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || '',
    },
  });
  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UsernameRequest) => {
      const payload: UsernameRequest = { name };
      const { data } = await axios.patch(`/api/username`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Username already taken.',
            description: 'Please choose another username.',
            variant: 'destructive',
          });
        }
      }
    },
    onSuccess: () => {
      toast({
        description: 'Username has been updated.',
      });
      router.refresh();
    },
  });
  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit((e) => {
        updateUsername(e);
      })}
    >
      <Card className="bg-greenBlack ">
        <CardHeader className="text-darkGray">
          Your username
          <CardDescription>Type the name you want to take!!!</CardDescription>
        </CardHeader>
        <CardContent>
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            {...register('name')}
            className=" pl-6 bg-borderShinyblue text-white"
          />
          {errors?.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}>Change name</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserNameForm;
