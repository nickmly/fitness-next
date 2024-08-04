import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export const ALL_MUSCLES = [
    'quadriceps',
    'hamstrings',
    'calves',
    'glutes',
    'triceps',
    'biceps',
    'forearms',
    'shoulders',
    'abdominals',
    'lower-back',
    'middle-back',
    'lats',
    'traps'
]

const ExercisesPage = () => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            {ALL_MUSCLES.map(m =>
                <Link key={m} className='w-full' href={`/exercises/muscle/${m}`}>
                    <Button variant='secondary' className='w-full capitalize'>{m}</Button>
                </Link>
            )}
        </div>
    )
}

export default ExercisesPage