import React from 'react'
import { findOrCreateLogOnDate } from '../../actions/log'
import LoggedExerciseCard from '../../../components/log/LoggedExerciseCard'
import { Button } from '@/components/ui/button'

interface Props {
    params: {
        date: string
    }
}

const LogDatePage = async ({ params: { date } }: Props) => {
    const log = await findOrCreateLogOnDate(date)
    return (
        <>
            <div className='flex flex-col gap-6'>
                {log &&
                    <div className='flex flex-col gap-2 mt-4'>
                        {log.exercises.map(e => <LoggedExerciseCard key={e.id} loggedExercise={e} />)}
                    </div>
                }
                <Button className='self-end'>Add Exercise</Button>
            </div>
        </>
    )
}

export default LogDatePage

