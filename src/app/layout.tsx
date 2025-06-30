import type { Metadata } from 'next';
import './globals.css';
import { CareerCompassProvider } from '@/context/career-compass-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Career Compass',
  description: 'Discover the perfect career path with AI-powered guidance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <CareerCompassProvider>
          {children}
        </CareerCompassProvider>
        <Toaster />
      </body>
    </html>
  );
}
