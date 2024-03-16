'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Horse } from "./definitions";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an horse status.',
  }),
  date: z.string(),
});
 
const AddHorse = FormSchema.omit({ id: true, date: true });
const UpdateHorse = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {};
    message?: string | null;
};

export async function addHorse(prevState: State, formData: FormData) {

  // DELETEME
  console.log("Adding horse 1");

// TODO validate
  
  const horseName = formData.get('horseName');
  const horseBreed = formData.get('horseBreed');
 
  // DELETEME
  console.log("Adding horse 2");
  
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
    formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = UpdateHorse.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

    if (!validatedFields.success) {
	return {
	    errors: validatedFields.error.flatten().fieldErrors,
	    message: 'Missing Fields. Failed to Update Horse.',
	};
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
 
    try {
	await sql`
      UPDATE horses
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    } catch (error) {
	return { message: 'Database Error: Failed to Update Horse.' };
    }
    
    revalidatePath('/dashboard/horses');
    redirect('/dashboard/horses');
}

export async function deleteHorse(id: string) {

    try {
	await sql`DELETE FROM horses WHERE id = ${id}`;
    } catch (error) {
	return {
	message: 'Failed to delete horse: ${error}'
	};
    };
  revalidatePath('/dashboard/horses');
}

