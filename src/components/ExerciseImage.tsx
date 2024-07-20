'use client'
import { Exercise } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import React from 'react'

interface Props {
    exercise: Exercise | null
}

const ExerciseImage = ({ exercise }: Props) => {
    return (
        <>
            {exercise &&
                <>
                    {exercise.images.map(image => <CldImage src={image} alt={exercise.name} width={320} height={240} />)}
                </>
            }
        </>
    )
}

export default ExerciseImage