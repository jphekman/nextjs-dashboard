'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Horse } from "./definitions";
import { getSession } from '@auth0/nextjs-auth0';

// TODO move into definitions - it has export problems
export type HorseData = {
  name: string,
  breed: string
  dateLastEdited: Date
}

export async function addHorse (
  formData: HorseData
) {

  try {

    let horse = new Horse(formData);
    const session = await getSession();
    if (session) {
      let user = session.user;
      horse.ownerId = user.sub;
      let msg = horse.validateSync();
      if (typeof msg !== 'undefined') { throw new Error ("Validation error in horse: " + msg); }
      await horse.save();
      console.log("Added horse", horse.name, new Date());
    } else {
      throw new Error("Session undefined.");
    }
  } catch (e) {
    console.log("Error in addHorse:", e)
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

  formData.dateLastEdited = new Date();

  const session = await getSession();
  if (session) {
    let user = session.user;
    try {
      let horse = await Horse.findOneAndUpdate(
	{ _id: id}, formData,
	{ returnOriginal: false}
      );
      if (horse.ownerId != user.sub) {
	throw new Error("Horse is not owned by this user.");
      }
      let msg = horse.validateSync();
      if (typeof msg !== 'undefined') { throw new Error ("Validation error in horse: " + msg); }
      await horse.save();
      console.log("Saved changes to ", horse.name, "/", horse.id);
    } catch (e) {
      console.log("Error in updateHorse:", id, e)
      throw new Error ("Failed to save changes to horse " + id);
    };
  }
  
  revalidatePath('/dashboard/horses');
  redirect('/dashboard/horses');
}

export async function deleteHorse(id: string) {
   
  const session = await getSession();
  if (session) {
    let user = session.user;
    try {
      await Horse.findOneAndDelete({ _id: id, ownerId:user.sub});
      console.log("Deleted horse", id, new Date());
    } catch (e) {
      console.log("Error in deleteHorse:", id, e)
      throw new Error ("Failed to delete horse " + id);
    };
  }

  revalidatePath('/dashboard/horses');
}

