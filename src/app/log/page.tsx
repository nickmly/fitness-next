import React from 'react'
import DatePicker from '@/components/ui/date-picker'
import { redirect } from 'next/navigation'
import { formatISO, parseISO } from 'date-fns'
import { createOrGetLogOnDate } from '../actions/log'

interface Props {
    searchParams: {
        date?: string
    }
}

const LogPage = async ({ searchParams }: Props) => {
    const searchDate = parseISO(searchParams.date || new Date().toISOString())
    const formattedDate = formatISO(searchDate, { representation: 'date' })
    const redirectToDate = async (date: Date) => {
        'use server'
        redirect(`/log?date=${formatISO(date, { representation: 'date' })}`)
    }
    const log = await createOrGetLogOnDate(formattedDate)

    return (
        <>
            <DatePicker defaultDate={searchDate} onUpdate={redirectToDate} />
            <p>{log && log.date}</p>
        </>

    )
}

export default LogPage