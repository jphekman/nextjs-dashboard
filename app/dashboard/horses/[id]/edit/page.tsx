import EditHorseForm from '@/app/ui/horses/edit-form';
import Breadcrumbs from '@/app/ui/horses/breadcrumbs';
import { fetchHorseById } from '@/app/lib/data';
import { Horse } from "@/app/lib/definitions";
//import { HorseData } from "@/app/lib/actions";
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const horse = await fetchHorseById(id);

    if (!horse) {
	notFound();
    }

  // Load data from Horse into HorseData
  // TODO implement - well first try again just passing horse
  //let horseData : HorseData = { horseName: 'Starbuck', horseBreed: 'Paint'};
  
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Horses', href: '/dashboard/horses' },
          {
            label: 'Edit Horse',
            href: `/dashboard/horses/${id}/edit`,
            active: true,
          },
        ]}
      />
	<EditHorseForm horse={horse} />
    </main>
  );
}
