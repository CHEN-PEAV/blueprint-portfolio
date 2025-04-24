import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import Footer from '@/components/Footer';

// Instantiate the font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable name
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
        suppressHydrationWarning={true} // Moved here from <html>
        className={cn(
          'min-h-screen font-sans antialiased flex flex-col',
          inter.variable // Apply the Inter font variable
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
