import dbConnect from "@/app/lib/dbConnect";
import Breadcrumbs from '@/app/ui/horses/breadcrumbs';
import Form from '@/app/ui/horses/add-form';
 
export default async function Page() {
 
  await dbConnect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Horses', href: '/dashboard/horses' },
          {
            label: 'Add Horse',
            href: '/dashboard/horses/add',
            active: true,
          },
        ]}
      />
    <Form />
    </main>
  );
}
