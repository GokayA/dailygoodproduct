import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/Toaster';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Roboto_Flex } from 'next/font/google';

const inter = Roboto_Flex({ subsets: ['latin'] });

export const metadata = {
  title: 'Pro product review',
  description: 'Pro product review | Home',
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn('bg-greenBlack', inter.className)}>
      <body className="bg-greenBlack">
        <Navbar />
        {authModal}

        <div className=" max-w-[90rem] w-full mx-auto h-full pt-12">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
