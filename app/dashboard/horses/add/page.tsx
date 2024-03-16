import Form from '@/app/ui/horses/create-form';
import Breadcrumbs from '@/app/ui/horses/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Horses', href: '/dashboard/horses' },
          {
            label: 'Add Horse',
            href: '/dashboard/horses/create',
            active: true,
          },
        ]}
      />
    <Form />
    </main>
  );
}
