import { Roboto_Flex, Roboto_Mono } from 'next/font/google';
import '../styles/globals.css';

const inter = Roboto_Flex({ subsets: ['latin'] });

export const metadata = {
  title: 'Pro product review',
  description: 'Pro product review | Home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
