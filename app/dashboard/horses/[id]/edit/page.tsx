import Form from '@/app/ui/horses/edit-form';
import Breadcrumbs from '@/app/ui/horses/breadcrumbs';
import { fetchHorseById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const horse = await fetchHorseById(id);

    if (!horse) {
	notFound();
    }

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
	<Form horse={horse} />
    </main>
  );
}
