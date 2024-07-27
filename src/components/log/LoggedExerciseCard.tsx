import { Exercise, LoggedExercise } from '@prisma/client'
import React from 'react'
import { TrashIcon, PencilIcon } from 'lucide-react'
import LoggedExerciseActionButton from './LoggedExerciseActionButton'
import { deleteExerciseFromLog } from '@/app/actions/log'
import { revalidatePath } from 'next/cache'

interface LoggedExerciseWithExercise extends LoggedExercise {
  exercise: Exercise | null
}

interface Props {
  loggedExercise: LoggedExerciseWithExercise
}

const LoggedExerciseCard = ({ loggedExercise }: Props) => {
  return (
    <div className='bg-muted rounded-lg flex justify-between'>
      <span className='p-4'>
        {loggedExercise.exercise && loggedExercise.exercise.name}
      </span>
      <div className='flex self-stretch'>
        <LoggedExerciseActionButton
          className='hover:bg-blue-500 rounded-none'
          performAction={async () => {
            'use server'
            console.log("TODO: route to edit page")
          }}>
          <PencilIcon className='w-4 h-4' />
        </LoggedExerciseActionButton>
        <LoggedExerciseActionButton
          className='hover:bg-red-500 rounded-l-none'
          performAction={async () => {
            'use server'
            await deleteExerciseFromLog(loggedExercise.id)
            revalidatePath('/log/[date]', 'page')
          }}>
          <TrashIcon className='w-4 h-4' />
        </LoggedExerciseActionButton>
      </div>
    </div>
  )
}

export default LoggedExerciseCard