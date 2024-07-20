'use client'
import { Exercise } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import React from 'react'

interface Props {
    exercise: Exercise | null
}

const ExerciseImages = ({ exercise }: Props) => {
    return (
        <>
            {exercise &&
                <div className="flex justify-around gap-3 flex-wrap">
                    {exercise.images.map(image => <CldImage key={image} src={image} alt={exercise.name} width={320} height={240} />)}
                </div>
            }
        </>
    )
}

export default ExerciseImages