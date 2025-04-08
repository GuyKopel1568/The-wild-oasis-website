import { redirect } from 'next/navigation';

export async function signInAction() {
  // this won't work for popup
  redirect('/api/auth/signin/google?callbackUrl=/account');
}

export async function signOutAction() {
  redirect('/api/auth/signout?callbackUrl=/');
}
