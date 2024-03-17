'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Horse } from "./definitions";

// TODO can I use Mongoose schema here?
export type HorseData = {
  horseName: string,
  horseBreed: string
}

export async function addHorse (
  formData: HorseData
) {

  // DELETEME
  console.log("Adding horse 1");

// TODO validate
  
  const horseName = formData.horseName;
  const horseBreed = formData.horseBreed;
 
  // DELETEME
  console.log("Adding horse 2");

  // TODO how does react-form-hook handle this?
  // If form validation fails, return errors early. Otherwise, continue.
//  if (!validatedFields.success) {
    //DELETEME
  //  console.log("Errors ", validatedFields.error.flatten().fieldErrors);
    //return {
      //errors: validatedFields.error.flatten().fieldErrors,
      //message: 'Missing Fields. Failed to add horse.',
    //};
 // }
 
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

