import { getDateWithoutTime } from '@/utils/date'
import { LoaderCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const LogPage = () => {
    const date = getDateWithoutTime(new Date())
    redirect(`/log/${date}`)

    return (
        <div className='w-full flex justify-center items-center'>
            <LoaderCircle className='animate-spin w-20 h-20' />
        </div>
    )
}

export default LogPage