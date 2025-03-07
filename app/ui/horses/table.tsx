import Image from 'next/image';
import { UpdateHorse, DeleteAlertHorse } from '@/app/ui/horses/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredHorses } from '@/app/lib/data';

export default async function HorsesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const horses = await fetchFilteredHorses(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Breed
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date Entered
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date Last Edited
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {horses?.map((horse) => (
                <tr
                  key={horse._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{horse.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {horse.breed}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(horse.dateCreated)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(horse.dateLastEdited)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateHorse id={horse._id} />
                      <DeleteAlertHorse id={horse._id} name={horse.name}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
