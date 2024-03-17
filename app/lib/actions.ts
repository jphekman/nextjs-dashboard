'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Horse } from "./definitions";

// TODO can I use Mongoose schema here (and in update)?
export type HorseData = {
  horseName: string,
  horseBreed: string
}

export async function addHorse (
  formData: HorseData
) {

  // TODO validate
  
  const horseName = formData.horseName;
  const horseBreed = formData.horseBreed;

  // New Horse model
  const horse = new Horse({
    name: horseName,
    breed: horseBreed
  });

  // Mongoose save to database
  await horse.save();
  
  // Revalidate the cache for the horses page and redirect the user.
  revalidatePath('/dashboard/horses');
  redirect('/dashboard/horses');
}

export async function updateHorse(
  id: string,
  formData: HorseData
) {

// TODO implement
  
    revalidatePath('/dashboard/horses');
    redirect('/dashboard/horses');
}

// TODO implement with Mongoose
export async function deleteHorse(id: string) {

  //await sql`DELETE FROM horses WHERE id = ${id}`;
  revalidatePath('/dashboard/horses');
}

