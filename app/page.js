import Link from 'next/link';
import Navigation from './components/Navigation';

export default function Page() {
  return (
    <div>
      <Navigation />
      <h1>The Wild Oasis. Welcome To Paradise!</h1>
      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
