import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <>

      {session?.user ?
        <h1 className="text-2xl">Hello, {session?.user?.name}</h1>
        :
        <>
          <p>Home Page</p>
        </>
      }
    </>
  );
}
