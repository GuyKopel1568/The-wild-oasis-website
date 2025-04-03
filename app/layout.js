import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';

import { Josefin_Sans } from 'next/font/google';
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

import '@/app/_styles/globals.css';

export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    default: 'Welcome | The Wild Oasis',
    template: '%s | The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel in the heart of the Italian Dolomites, surrounded by nature and breathtaking views.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
      >
        <header>
          <Logo />
        </header>

        <Navigation />
        {children}
        <footer>Copyright by the Wild Oasis</footer>
      </body>
    </html>
  );
}
