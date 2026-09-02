import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import SmoothScroll from "@/components/SmoothScroll";
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});



export const metadata: Metadata = {
  title: 'نظام إدارة عيادة الأسنان',
  description: 'نظام إدارة ذكي وشامل لعيادات الأسنان',
    manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}</body>
    </html>
  );
}
