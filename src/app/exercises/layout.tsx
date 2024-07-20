import ExerciseSearch from '@/components/exercise/ExerciseSearch'
import React from 'react'


interface Props {
    children: React.ReactNode
}

const ExerciseSearchPage = ({ children }: Props) => {
    return (
        <div>
            <ExerciseSearch />
            {children}
        </div>
    )
}

export default ExerciseSearchPage