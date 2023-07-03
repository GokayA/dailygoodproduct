'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from './ui/Button';

interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
  const router = useRouter();
  return (
    <Button
      className="bg-greenBlack text-lightSlateGray hover:bg-darkGray hover:text-greenBlack"
      onClick={() => {
        router.back();
      }}
    >
      <X />
    </Button>
  );
};

export default CloseModal;
