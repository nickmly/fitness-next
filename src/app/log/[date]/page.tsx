import React from 'react'
import { formatISO, parseISO } from 'date-fns'
import { findOrCreateLogOnDate } from '../../actions/log'
import LoggedExerciseCard from '../../../components/log/LoggedExerciseCard'
import { formatDate } from '@/utils/date'
interface Props {
    params: {
        date: string
    }
}

const LogDatePage = async ({ params: { date } }: Props) => {
    const formattedDate = formatDate(date)
    const log = await findOrCreateLogOnDate(formattedDate)
    return (
        <>
            {log &&
                <div className='flex flex-col gap-2 mt-4'>
                    {log.exercises.map(e => <LoggedExerciseCard key={e.id} loggedExercise={e} />)}
                </div>
            }
        </>
    )
}

export default LogDatePage

