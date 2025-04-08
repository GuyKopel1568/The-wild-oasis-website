import { auth } from '../_lib/auth';

export const metadata = {
  title: 'Guests area',
};

export default async function Page() {
  const session = await auth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7 flex items-center gap-4">
      <span>Welcome {session.user.name}</span>
      <img
        src={session.user.image}
        alt="User image"
        className="rounded-full w-10 h-10 ml-4"
      />
    </h2>
  );
}
