import EditHorseForm from '@/app/ui/horses/edit-form';
import Breadcrumbs from '@/app/ui/horses/breadcrumbs';
import { fetchHorseById } from '@/app/lib/data';
import { Horse } from "@/app/lib/definitions";
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const horse : InstanceType<typeof Horse> = await fetchHorseById(id);
  
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
      <EditHorseForm { ...horse } />
      </main>
  );
}
