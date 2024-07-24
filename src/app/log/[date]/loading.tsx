import React from 'react'
import { LoaderCircle } from 'lucide-react'

const LoadingLogPage = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <LoaderCircle className='animate-spin w-20 h-20' />
        </div>
    )
}

export default LoadingLogPage