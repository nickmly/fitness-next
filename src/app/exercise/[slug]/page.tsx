import { getExerciseBySlug } from '@/app/actions/exercise'
import ExerciseImage from '@/components/ExerciseImage'
import { Exercise } from '@prisma/client'
import React from 'react'

interface Props {
    params: {
        slug: string
    }
}

const ExercisePage = async ({ params: { slug } }: Props) => {
    const exercise: Exercise | null = await getExerciseBySlug(slug)
    if (!exercise) {
        return <p>Exercise not found</p>
    }
    return (
        <div>
            <ExerciseImage exercise={exercise} />
            {exercise &&
                <ul className="list-disc">
                    {exercise.instructions.map(i =>
                        <li key={i} className="my-2">{i}</li>
                    )}
                </ul>
            }
        </div>
    )
}

export default ExercisePage