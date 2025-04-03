import { Josefin_Sans } from 'next/font/google';
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

import '@/app/_styles/globals.css';
import Header from './_components/Header';

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
        className={`${josefin.className} bg-primary-950 antialiased text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl  mx-auto w-full ">{children}</main>
        </div>
      </body>
    </html>
  );
}
