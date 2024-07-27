import { Exercise } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import ExerciseImages from './ExerciseImages'

interface Props {
    exercise: Partial<Exercise>
}

const ExerciseCard = ({ exercise }: Props) => {
    return (
        <div className="bg-muted/70 p-5 rounded-lg shadow-lg">
            <div className="mb-5">
                <h3 className="text-2xl mb-2 font-bold">{exercise.name}</h3>
                <div className="flex flex-wrap gap-2 text-base text-primary/70">
                    {exercise.primaryMuscles?.map(m => <Badge key={m}>{m}</Badge>)}
                    {exercise.secondaryMuscles?.map(m => <Badge key={m}>{m}</Badge>)}
                </div>
            </div>
            <ExerciseImages exercise={exercise} />
            {exercise &&
                <ul className="p-5 list-disc">
                    {exercise.instructions?.map(i =>
                        <li key={i} className="my-2">{i}</li>
                    )}
                </ul>
            }
        </div>
    )
}

export default ExerciseCard