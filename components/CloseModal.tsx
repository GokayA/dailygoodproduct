'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';

const CloseModal = () => {
  const router = useRouter();

  return (
    <Button
      className="bg-greenBlack text-lightSlateGray hover:bg-darkGray hover:text-greenBlack"
      onClick={() => {
        router.back();
      }}
    >
      <X aria-label="close sign in modal" className="h-5 w-5" />
    </Button>
  );
};

export default CloseModal;
