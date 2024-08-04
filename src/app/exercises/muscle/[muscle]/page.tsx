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
                    <Link key={e.slug} className='w-full' href={`/exercises/${e.slug}`}>
                        <Button variant='secondary' className='w-full capitalize'>{e.name}</Button>
                    </Link>
                )}
            </div>
        </>

    )
}

export default ExerciseMusclePage