import { getExerciseBySlug } from '@/app/actions/exercise'
import ExerciseCard from '@/components/exercise/ExerciseCard'
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
        <ExerciseCard exercise={exercise} />
    )
}

export default ExercisePage