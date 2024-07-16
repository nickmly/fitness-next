import { auth, signIn, signOut } from "@/auth"

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
            <button type="submit">Sign out</button>
          </form>
        </>
        :
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      }
    </>
  );
}
