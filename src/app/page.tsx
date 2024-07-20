import { auth } from "@/auth"
import { getExerciseBySlug } from "./actions/exercise";
import ExerciseImage from "@/components/ExerciseImage";
import { Exercise } from "@prisma/client";

export default async function Home() {
  const session = await auth()
  const exercise: Exercise | null = await getExerciseBySlug('Bent_Over_Barbell_Row')
  return (
    <>

      {session?.user ?
        <h1 className="text-2xl">Hello, {session?.user?.name}</h1>
        :
        <>
          <ExerciseImage exercise={exercise} />
          <p>Home Page</p>
        </>
      }
    </>
  );
}
