import type { Metadata } from 'next';
import { GeistSans as GeistSansFont, GeistMono as GeistMonoFont } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import Footer from '@/components/Footer';

// Instantiate the fonts
const geistSans = GeistSansFont({
  subsets: ['latin'],
  variable: '--font-geist-sans', // CSS variable name
});

const geistMono = GeistMonoFont({
  subsets: ['latin'],
  variable: '--font-geist-mono', // CSS variable name
});


export const metadata: Metadata = {
  title: 'Pondara - Web Developer Portfolio',
  description: 'Portfolio of Pondara, a creative Web Developer specializing in modern web technologies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={cn(
          'min-h-screen font-sans antialiased flex flex-col',
          geistSans.variable, // Apply the sans font variable
          geistMono.variable  // Apply the mono font variable
        )}
      >
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
