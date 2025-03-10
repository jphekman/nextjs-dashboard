import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Horse } from '../../lib/definitions';
import { fetchLatestHorses } from '@/app/lib/data';

export default async function LatestHorses() {

  const latestHorses : Array<InstanceType<typeof Horse>>
	= await fetchLatestHorses();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Horses
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        { <div className="bg-white px-6">
          {latestHorses.map((horse, i) => {
            return (
              <div
                key={horse._id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                { /* <Image
                    src={horse.image_url}
                    alt={`${horse.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                    /> */ }
                  <div className="min-w-0">
                    <p className="truncate text-sm md:text-base">
                {horse.name} - {horse.breed}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {horse.amount}
                </p>
              </div>
            );
          })}
          </div> }
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
