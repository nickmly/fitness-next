import React from 'react'
import { findOrCreateLogOnDate } from '../../actions/log'
import LoggedExerciseCard from '../../../components/log/LoggedExerciseCard'
import ExerciseSearchButton from '@/components/exercise/ExerciseSearchButton'
import { PlusIcon } from 'lucide-react'

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
                <ExerciseSearchButton
                    className='self-end'
                    buttonIcon={<PlusIcon />}
                    buttonLabel='Add Exercise'
                    buttonTitle='Add Exercise'
                />
            </div>
        </>
    )
}

export default LogDatePage

