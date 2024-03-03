import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default async withPageAuthRequired(function Page() {
  const { user } = await getSession();
  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {user.name}</p>
    </div>
  );
});


//export function withPageAuthRequired(ProtectedPage() {
//  return <div>Protected content</div>;
//}, { returnTo: '/protected' });
