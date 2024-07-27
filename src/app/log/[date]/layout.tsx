
import React from 'react'
import DatePicker from '../../../components/ui/date-picker'
import { redirect } from 'next/navigation'
import { formatISO, parseISO } from 'date-fns'


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
        <>
            <DatePicker defaultDate={params.date} onUpdate={redirectToDate} />
            {children}
        </>
    )
}

export default LogLayout