'use client';

import Link from 'next/link';
import {
  TagIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { addHorse, HorseData } from '@/app/lib/actions';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function Form() {
  const { handleSubmit, register, formState: { isValid, errors } } =
	useForm<HorseData>({mode: 'onChange'});
  
  return (
      <form onSubmit={handleSubmit(async (data) => await addHorse(data))}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
	
    {/* Horse Name */}
      <div className="mb-4">
      <label htmlFor="name" className="mb-2 block text-sm font-medium">
      Name
    </label>
      <div className="relative">
      <input
    { ... register("horseName", {
      required: true,
    })}
    type="text"
    placeholder="Name"
    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
    defaultValue=""
      />
      <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">

    {errors?.horseName?.type === "required" && 
     <p className="mt-2 text-sm text-red-500">Horse name is required.</p>
    }
    </div>	    
      </div>


      {/* Breed */}
        <div className="mb-4">
          <label htmlFor="breed" className="mb-2 block text-sm font-medium">
            Breed
          </label>
          <div className="relative">
            <input
      { ... register("horseBreed")}
      type="text"
      placeholder="Breed"
        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue=""
	aria-describedby="breed-error"
	    />
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
	    <div id="breed-error" aria-live="polite" aria-atomic="true">
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
        <Button type="submit" disabled={!isValid}>Add Horse</Button>
      </div>
    </form>
    );
}
