'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Horse } from "./definitions";

// TODO move to definitions?
export type HorseData = {
  name: string,
  breed: string
  dateLastEdited: Date
}

export async function addHorse (
  formData: HorseData
) {

  // New Horse model
  // TODO can maybe just pass in formData straight + lastEdited
  const horse = new Horse({
    name: formData.name,
    breed: formData.breed
  });

  // TODO horse.validate()
  
  // Mongoose save to database
  try {
    await horse.save();
  } catch (e) {
    throw new Error ("Failed to connect to database.");
  }
  
  // Revalidate the cache for the horses page and redirect the user.
  revalidatePath('/dashboard/horses');
  redirect('/dashboard/horses');
}

export async function updateHorse(
  id: string,
  formData: HorseData
) {

  formData.dateLastEdited = new Date()
  
  try {
    let horse = await Horse.findOneAndUpdate(
      { _id: id}, formData,
      { runValidators: true, returnOriginal: false}
    );
    await horse.save();
    console.log("Saved changes to ", horse.name, "/", horse.id);
  } catch (e) {
    throw new Error ("Failed to save changes to horse " + id);
  };
  
  revalidatePath('/dashboard/horses');
  redirect('/dashboard/horses');
}

// TODO implement with Mongoose
export async function deleteHorse(id: string) {

  //await sql`DELETE FROM horses WHERE id = ${id}`;
  revalidatePath('/dashboard/horses');
}

