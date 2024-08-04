import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '../components/navigation/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import GitHubIcon from '@/svgr/github';
import { ExternalLinkIcon } from 'lucide-react';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'nextFitness',
  description: 'Fitness logging app built in Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={cn(notoSans.className, 'flex flex-col h-screen')}>
        <Navbar />
        <main className='flex justify-center flex-auto flex-shrink-0'>
          {children}
        </main>
        <footer className='flex flex-col w-full h-40 gap-2 justify-center items-center bg-black/50 flex-shrink-0'>
          <p>This site is for demonstration purposes only.</p>
          <Link href='https://github.com/nickmly/fitness-next' target='_blank' className='flex gap-2 items-center hover:underline'>
            <GitHubIcon className='fill-primary w-4 h-4' />
            <span className='flex items-center gap-1'>
              View the source code <ExternalLinkIcon className='w-3 h-3' />
            </span>
          </Link>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
