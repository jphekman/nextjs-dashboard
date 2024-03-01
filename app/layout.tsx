import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@/app/ui/global.css';
import { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s | Ponies Ponies Ponies',
    default: 'Ponies Ponies Ponies',
  },
  description: 'Model horse showing made easy.',
  metadataBase: new URL('https://nextjs-dashboard-sepia-seven-46.vercel.app/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <html lang="en">
      <UserProvider>
      <body className={`${inter.className} antialiased`}>{children}</body>
      </UserProvider>
      </html>
  );
}
