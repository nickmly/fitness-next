
import React from 'react'
import DatePicker from '../../../components/ui/date-picker'
import { redirect } from 'next/navigation'
import { formatISO } from 'date-fns'


interface Props {
    children: React.ReactNode
    params: {
        date?: string
    }
}

const LogLayout = async ({ children, params }: Props) => {
    const redirectToDate = async (date: Date) => {
        'use server'
        redirect(`/log/${formatISO(date, { representation: 'date' })}`)
    }

    return (
        <div className='w-full max-w-screen-xl m-5 lg:mx-10'>
            <DatePicker defaultDate={params.date} onUpdate={redirectToDate} />
            {children}
        </div>
    )
}

export default LogLayout