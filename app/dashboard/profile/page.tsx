import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

import UserProfile from '@/app/ui/userProfile';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {

  return ( <UserProfile /> );
}
