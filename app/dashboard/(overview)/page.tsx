import dbConnect from "@/app/lib/dbConnect";
import LatestHorses from '@/app/ui/dashboard/latest-horses';
import { lusitana } from '@/app/ui/fonts';
import { LatestHorsesSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page() {

  await dbConnect();
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
    </h1>
      { /*
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <p>One</p>
      </div>
	*/ }
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
	  <Suspense fallback={<LatestHorsesSkeleton />}>
            <LatestHorses />
          </Suspense>
      </div>
    </main>
  );
}
