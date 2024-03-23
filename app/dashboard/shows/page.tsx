import { Metadata } from 'next';
import Pagination from '@/app/ui/horses/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shows',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
	query?: string;
	page?: string;
    };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Horses</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search shows..." />
      </div>
      { /*<Suspense key={query + currentPage} fallback={<HorsesTableSkeleton />}>
	  <Table query={query} currentPage={currentPage} />
	  </Suspense> */ }
      <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
