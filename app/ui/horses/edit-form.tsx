'use client';

import Link from 'next/link';
import { TagIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateHorse, HorseData } from '@/app/lib/actions';
import { Horse } from '@/app/lib/definitions';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function EditHorseForm( horse : InstanceType<typeof Horse> ) {
  const { handleSubmit, register, formState: { isValid, errors } } =
	useForm<HorseData>({mode: 'onChange'});

  return (
      <form onSubmit={handleSubmit(async (data) => await updateHorse(horse._id, data))}>
    <div className="rounded-md bg-gray-50 p-4 md:p-6">	     

      {/* Horse Name */}
      <div className="mb-4">
	<label htmlFor="name" className="mb-2 block text-sm font-medium">
	  Name
	</label>
	<div className="relative">
	  <input
	    { ... register("name", {
	    required: true,
	    })}
	    type="text"
	    defaultValue={horse.name}
	    placeholder="Name"
	    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
	    />
	  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
	</div>
	<div id="name-error" aria-live="polite" aria-atomic="true">

	  {errors?.name?.type === "required" && 
	  <p className="mt-2 text-sm text-red-500">Horse name is required.</p>}
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
		{ ... register("breed")}
                type="string"
                defaultValue={horse.breed}
                placeholder="Enter breed"
		className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
		aria-describedby="breed-error"
		/>
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
        <Button type="submit">Save Changes</Button>
      </div>
    </div>
  </form>

  );}
