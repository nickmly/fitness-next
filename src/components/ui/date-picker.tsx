'use client'
import React, { useEffect, useState } from 'react'
import { Popover } from './popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { CalendarIcon } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Calendar } from './calendar'
import { Button } from './button'

interface Props {
    defaultDate?: Date | string
    onUpdate: (date: Date) => void
}

const DatePicker = ({ onUpdate, defaultDate }: Props) => {
    const [date, setDate] = useState<Date | undefined>()

    useEffect(() => {
        if (defaultDate) {
            setDate(parseISO(defaultDate as string))
        }
    }, [])

    useEffect(() => {
        if (date) {
            onUpdate(date)
        }
    }, [date])

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant='outline' className='flex gap-2'>
                        <CalendarIcon className='w-5 h-5' />
                        <span>{date ? format(date, 'PPP') : 'Pick a date'}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar mode='single' selected={date} onSelect={setDate} className='mt-2 bg-background rounded-md border-2 border-muted' />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default DatePicker