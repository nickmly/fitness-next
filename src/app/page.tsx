import { auth, signIn, signOut } from "@/auth"
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth()

  return (
    <>
      Home Page
      {session?.user ?
        <>
          <p>{session?.user?.name}</p>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <Button type="submit">Sign out</Button>
          </form>
        </>
        :
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <Button type="submit">Signin with Google</Button>
        </form>
      }
    </>
  );
}
