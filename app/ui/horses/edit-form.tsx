'use client';

import { HorseForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateHorse } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditHorseForm({
  horse,
}: {
  horse: HorseForm;
}) {
    const initialState = { message: null, errors: {} };
    const updateHorseWithId = updateHorse.bind(null, horse.id);
    const [state, dispatch] = useFormState(updateHorseWithId, initialState);
 
    return ( <form action={dispatch}>
	     <div className="rounded-md bg-gray-50 p-4 md:p-6">
	     
        <div className="mb-4">
          <label htmlFor="horseName" className="mb-2 block text-sm font-medium">
            Choose horse
          </label>
          <div className="relative">
            <select
              id="horse"
              name="horseId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
             defaultValue={horse.id}
	     aria-describedby="horse-error"
            >
              <option value="" disabled>
                Select a horse
              </option>
              {customers.map((horse) => (
                <option key={horse.id} value={horse.id}>
                  {horse.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
	    <div id="horse-error" aria-live="polite" aria-atomic="true">
        {state.errors?.horseId &&
          state.errors.horseId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
		  {error}
            </p>
          ))}
      </div>	    
        </div>

	             {/* Horse Breed */}
        <div className="mb-4">
          <label htmlFor="breed" className="mb-2 block text-sm font-medium">
            Choose a breed
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="breed"
                name="breed"
                type="string"
                defaultValue={horse.breed}
                placeholder="Enter breed"
             className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
	     aria-describedby="breed-error"
              />
            </div>
	    <div id="breed-error" aria-live="polite" aria-atomic="true">
            {state.errors?.breed &&
             state.errors.breed.map((error: string) => (
		     <p className="mt-2 text-sm text-red-500" key={error}>
		     {error}
		 </p>
             ))}
	</div>	    
          </div>
	     </div>

	     <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/horses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Horse</Button>
	     </div>

     
	     </div>
    </form>
	   );
}
