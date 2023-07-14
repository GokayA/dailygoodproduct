import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/Toaster';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Roboto_Flex } from 'next/font/google';

const roboto = Roboto_Flex({ subsets: ['latin'] });

export const metadata = {
  title: 'Pro Review Product',
  description: 'Pro Review Product | Home',
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn('bg-greenBlack', roboto.className)}>
      <body className="bg-greenBlack  flex flex-col justify-between">
        <Providers>
          <Navbar />
          {authModal}
          <div className="flex flex-col justify-between min-h-screen flex-grow">
            <div className="max-w-[90rem] w-full mx-auto  pt-12">
              {children}
            </div>
            <Footer />
            <Analytics />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
