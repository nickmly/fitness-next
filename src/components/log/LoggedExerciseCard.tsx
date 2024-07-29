import { Exercise, LoggedExercise, TypedSet } from '@prisma/client'
import React from 'react'
import { TrashIcon, PencilIcon } from 'lucide-react'
import LoggedExerciseActionButton from './LoggedExerciseActionButton'
import { deleteExerciseFromLog } from '@/app/actions/log'
import { revalidatePath } from 'next/cache'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface LoggedExerciseWithExercise extends LoggedExercise {
  exercise: Exercise | null
  sets: TypedSet[]
}

interface Props {
  loggedExercise: LoggedExerciseWithExercise
}

const LoggedExerciseCard = ({ loggedExercise }: Props) => {
  return (
    <AccordionItem value={loggedExercise.id} className='bg-muted rounded-lg'>
      <AccordionTrigger className='px-4 py-2'>
        {loggedExercise.exercise?.name}
      </AccordionTrigger>
      <AccordionContent className='flex flex-col p-0'>
        <div className='self-end'>
          <LoggedExerciseActionButton
            title="Edit exercise"
            className='hover:bg-blue-500 rounded-none'
            performAction={async () => {
              'use server'
              console.log("TODO: route to edit page")
            }}>
            <PencilIcon className='w-4 h-4' />
          </LoggedExerciseActionButton>
          <LoggedExerciseActionButton
            title="Delete exercise"
            className='hover:bg-red-500 rounded-l-none rounded-t-none'
            performAction={async () => {
              'use server'
              await deleteExerciseFromLog(loggedExercise.id)
              revalidatePath('/log/[date]', 'page')
            }}>
            <TrashIcon className='w-4 h-4' />
          </LoggedExerciseActionButton>
        </div>

      </AccordionContent>
    </AccordionItem>
  )
}

export default LoggedExerciseCard