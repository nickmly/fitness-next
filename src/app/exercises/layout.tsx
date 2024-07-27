import ExerciseSearchButton from '@/components/exercise/ExerciseSearchButton'
import { SearchIcon } from 'lucide-react'
import React from 'react'


interface Props {
    children: React.ReactNode
}

const ExerciseSearchPage = ({ children }: Props) => {
    return (
        <div>
            <ExerciseSearchButton
                variant='outline'
                buttonIcon={<SearchIcon />}
                buttonLabel='Search'
                buttonTitle='Open search'
            />
            {children}
        </div>
    )
}

export default ExerciseSearchPage