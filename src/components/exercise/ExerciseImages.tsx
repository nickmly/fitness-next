'use client'
import { Exercise } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import React from 'react'

interface Props {
    exercise: Partial<Exercise> | null
}

const ExerciseImages = ({ exercise }: Props) => {
    return (
        <>
            {exercise &&
                <div className="flex justify-around lg:justify-start gap-3 flex-wrap max-w-3xl lg:max-w-none">
                    {exercise.images?.map(image => <CldImage key={image} src={image} alt={exercise.name || 'Image of Exercise'} width={540} height={480} className='max-w-full w-80 lg:w-[540px]' />)}
                </div>
            }
        </>
    )
}

export default ExerciseImages