import ExerciseSearchButton from '@/components/exercise/ExerciseSearchButton'
import { SearchIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'


interface Props {
    children: React.ReactNode
}

const ExerciseSearchPage = ({ children }: Props) => {
    return (
        <div className='w-full max-w-screen-xl m-5 lg:mx-10'>
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
            {children}
        </div>
    )
}

export default ExerciseSearchPage