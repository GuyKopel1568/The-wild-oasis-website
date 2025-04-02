import Counter from '@/app/_components/Counter';

export default async function Page() {
  return (
    <div>
      <h1>Cabins Page</h1>
      <ul></ul>
      <Counter users={data} />
    </div>
  );
}
