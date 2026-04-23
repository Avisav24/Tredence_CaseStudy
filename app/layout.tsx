import type { Metadata, Viewport } from 'next';
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
  title: "FlowHR | Visual HR Automation Designer",
  description: "The modern standard for HR automation. Design, simulate, and deploy complex HR workflows with a powerful drag-and-drop canvas. Built for high-performance HR teams.",
  keywords: ["HR Automation", "Workflow Designer", "Visual Workflow", "HR Tech", "Employee Onboarding"],
  authors: [{ name: "FlowHR Team" }],
  openGraph: {
    title: "FlowHR | Visual HR Automation Designer",
    description: "Design HR Workflows Visually.",
    type: "website",
  }
};

export const viewport: Viewport = {
  themeColor: "#03071d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-blue-500/10">
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
