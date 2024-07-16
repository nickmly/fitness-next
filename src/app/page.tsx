import { auth, signIn, signOut } from "@/auth"
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth()

  return (
    <>

      {session?.user ?
        <p>{session?.user?.name}</p>
        : <p>Home Page</p>
      }
    </>
  );
}
