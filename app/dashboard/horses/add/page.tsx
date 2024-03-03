import Form from '@/app/ui/horses/create-form';
import Breadcrumbs from '@/app/ui/horses/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
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
      <Form customers={customers} />
    </main>
  );
}
