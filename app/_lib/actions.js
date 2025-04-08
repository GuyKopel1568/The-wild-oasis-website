export async function signInAction() {
  // this won't work for popup
  redirect('/api/auth/signin/google?callbackUrl=/account');
}
