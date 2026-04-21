import type { Metadata } from 'next';
import { MSWProvider } from '@/components/MSWProvider';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'FlowHR — HR Workflow Designer',
  description:
    'Visually design, configure, and simulate HR workflows with a drag-and-drop canvas. Built with React Flow and Next.js.',
  keywords: ['HR', 'workflow', 'designer', 'react flow', 'automation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
