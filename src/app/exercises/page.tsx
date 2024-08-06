import { Button } from '@/components/ui/button'
import { ALL_MUSCLES } from '@/utils/muscles'
import Link from 'next/link'
import React from 'react'



const ExercisesPage = () => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            {ALL_MUSCLES.map(m =>
                <Button asChild key={m} variant='secondary'>
                    <Link className='w-full capitalize' href={`/exercises/muscle/${m}`}>
                        {m}
                    </Link>
                </Button>
            )}
        </div>
    )
}

export default ExercisesPage