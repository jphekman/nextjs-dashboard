'use client';

import { useUser } from "@auth0/nextjs-auth0/client";

import { lusitana } from '@/app/ui/fonts';
import Image from 'react-bootstrap/Image';

export default function UserProfile () {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Profile</h1>
      </div>
	<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
	<Image src={user.picture} alt={user.name} rounded />
	<p className={`${lusitana.className} text-xl text-gray-800 md:text-xl md:leading-normal`}>You are logged in as {user.name} ({user.email})</p>
      </div>
	</div>)
  );
}
