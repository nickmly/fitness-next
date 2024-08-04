import ExerciseSearchBackButton from '@/components/exercise/ExerciseSearchBackButton'
import ExerciseSearchButton from '@/components/exercise/ExerciseSearchButton'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'


interface Props {
    params: {
        slug: string,
        muscle: string
    }
    children: React.ReactNode
}

const ExerciseSearchLayout = ({ children, params }: Props) => {
    console.log(params)
    return (
        <div className='w-full max-w-screen-xl m-5 lg:mx-10'>
            <div className='flex gap-2'>
                <ExerciseSearchBackButton />
                <ExerciseSearchButton
                    variant='outline'
                    buttonIcon={<SearchIcon />}
                    buttonLabel='Search'
                    buttonTitle='Open search'
                    onClickExercise={async (e) => {
                        'use server'
                        redirect(`/exercises/${e.slug}`)
                    }}
                />
            </div>
            {children}
        </div>
    )
}

export default ExerciseSearchLayout