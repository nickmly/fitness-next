import React from 'react'
import { addExerciseToLog, deleteExerciseFromLog, findOrCreateLogOnDate, addSetToLoggedExercise } from '../../actions/log'
import LoggedExerciseCard from '../../../components/log/LoggedExerciseCard'
import ExerciseSearchButton from '@/components/exercise/ExerciseSearchButton'
import { PlusIcon } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { Accordion } from '@/components/ui/accordion'
import { TypedSetFormValues } from '@/components/log/LoggedExerciseSetForm'

interface Props {
    params: {
        date: string
    }
}

const LogDatePage = async ({ params: { date } }: Props) => {
    const log = await findOrCreateLogOnDate(date)
    if (!log) {
        return (
            <>
                <p>You must be signed in to see logs</p>
            </>
        )
    }
    return (
        <>
            <div className='flex flex-col gap-6'>
                {log &&
                    <Accordion className='flex flex-col gap-2 mt-4' type='single' collapsible>
                        {log.exercises.map(e =>
                            <LoggedExerciseCard
                                key={e.id}
                                loggedExercise={e}
                                createSet={async (set: TypedSetFormValues) => {
                                    'use server'
                                    await addSetToLoggedExercise(e.id, set)
                                    revalidatePath('/log/[date]', 'page')
                                }}
                                deleteExercise={async () => {
                                    'use server'
                                    await deleteExerciseFromLog(e.id)
                                    revalidatePath('/log/[date]', 'page')
                                }}
                            />
                        )}
                    </Accordion>
                }
                <ExerciseSearchButton
                    className='self-end'
                    buttonIcon={<PlusIcon />}
                    buttonLabel='Add Exercise'
                    buttonTitle='Add Exercise'
                    onClickExercise={async (e) => {
                        'use server'
                        if (log && e.slug) {
                            await addExerciseToLog(e.slug, log.id)
                            revalidatePath('/log/[date]', 'page')
                        }

                    }}
                />
            </div>
        </>
    )
}

export default LogDatePage

