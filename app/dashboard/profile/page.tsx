//import dbConnect from "@/app/lib/dbConnect";
import { lusitana } from '@/app/ui/fonts';
import UserProfile from '@/app/ui/userProfile';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {

  // await dbConnect();

  return ( <UserProfile /> );
}
