'use server';
import { supabase } from './supabase';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { getBookings } from './data-service';

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

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to create reservations');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    cabinId: bookingData.cabinId,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);
  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error('Reservation could not be created');
  }

  revalidatePath('/account/cabin/' + bookingData.cabinId);
  redirect('/thankyou');
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to delete reservations');

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingsId = guestBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId)) {
    throw new Error('You are not authorized to delete this reservation');
  }

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Reservation could not be deleted');

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  console.log(formData);
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update your booking');

  const guestBookings = await getBookings(session.user.guestId);
  const bookingId = Number(formData.get('bookingId'));

  const guestBookingsId = guestBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId))
    throw new Error('You are not authorized to update this reservation');

  const updateFields = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };

  const { error } = await supabase
    .from('bookings')
    .update(updateFields)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw new Error('Booking could not be updated');
  revalidatePath('/account/reservations/edit/' + bookingId);
  redirect('/account/reservations');
}
