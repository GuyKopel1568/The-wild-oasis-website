'use server';
import { supabase } from './supabase';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from './auth';

export async function signInAction() {
  // this won't work for popup
  redirect('/api/auth/signin/google?callbackUrl=/account');
}

export async function signOutAction() {
  redirect('/api/auth/signout?callbackUrl=/');
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update your profile');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please e a valid national ID number');

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) {
    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account/profile');
}
