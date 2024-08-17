import { getExercisesByMuscle } from '@/app/actions/exercise'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface Props {
    params: {
        muscle: string
    }
}

const ExerciseMusclePage = async ({ params }: Props) => {
    const exercises = await getExercisesByMuscle(params.muscle)
    if (!exercises) {
        return <p>Exercises not found</p>
    }
    return (
        <>
            <h2 className='text-xl font-bold capitalize mb-5'>{params.muscle} exercises</h2>
            <div className='flex flex-col gap-2'>
                {exercises.map(e =>
                    <Button asChild key={e.slug} variant='secondary' className='whitespace-normal'>
                        <Link className='w-full' href={`/exercises/${e.slug}`}>
                            {e.name}
                        </Link>
                    </Button>
                )}
            </div>
        </>

    )
}

export default ExerciseMusclePage