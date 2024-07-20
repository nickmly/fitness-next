import React from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'

const ExerciseSearch = () => {
    return (
        <div>
            <Input placeholder='Search for an exercise' className='mb-5' startIcon={<SearchIcon />} />
        </div>
    )
}

export default ExerciseSearch