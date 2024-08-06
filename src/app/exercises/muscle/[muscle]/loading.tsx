import { LoaderCircle } from 'lucide-react'
import React from 'react'


const ExerciseMuscleLoadingPage = () => {
    return (
        <>
            <div className='w-full flex justify-center items-center'>
                <LoaderCircle className='animate-spin w-20 h-20' />
            </div>

        </>
    )
}

export default ExerciseMuscleLoadingPage