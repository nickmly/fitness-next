'use client'
import { Exercise, LoggedExercise, TypedSet } from '@prisma/client'
import React, { useState } from 'react'
import { TrashIcon, CirclePlusIcon } from 'lucide-react'
import LoggedExerciseActionButton from './LoggedExerciseActionButton'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import LoggedExerciseSetForm, { TypedSetFormValues } from './LoggedExerciseSetForm'

interface LoggedExerciseWithExercise extends LoggedExercise {
  exercise: Exercise | null
  sets: TypedSet[]
}

interface Props {
  loggedExercise: LoggedExerciseWithExercise
  deleteExercise: () => Promise<void>
  createSet: (set: TypedSetFormValues) => Promise<void>
}

const LoggedExerciseCard = ({ loggedExercise, deleteExercise, createSet }: Props) => {
  const [showSetForm, setShowSetForm] = useState(false)
  const [createSetLoading, setCreateSetLoading] = useState(false)
  return (
    <AccordionItem value={loggedExercise.id} className='bg-muted rounded-lg'>
      <AccordionTrigger className='px-4 py-2'>
        {loggedExercise.exercise?.name}
      </AccordionTrigger>
      <AccordionContent className='flex flex-col p-0'>
        {showSetForm &&
          <LoggedExerciseSetForm
            loading={createSetLoading}
            createSet={
              async (set: TypedSetFormValues) => {
                setCreateSetLoading(true)
                await createSet(set)
                setCreateSetLoading(false)
                setShowSetForm(false)
              }
            }
          />
        }
        {!showSetForm && loggedExercise.sets.map(s =>
          <div className='px-4 py-2'>
            <span className='text-xl mx-1'>{s.weight}</span>
            <span className='text-muted-foreground'>lbs</span>
            <span className='mx-2'>x</span>
            <span className='text-xl mx-1'>{s.reps}</span>
            <span className='text-muted-foreground'>reps</span>
          </div>
        )}
        <div className='self-end'>
          <LoggedExerciseActionButton
            title="Add set"
            className='hover:bg-green-600 rounded-none'
            performAction={async () => {
              setShowSetForm(true)
            }}>
            <CirclePlusIcon className='w-4 h-4' />
          </LoggedExerciseActionButton>
          <LoggedExerciseActionButton
            title="Delete exercise"
            className='hover:bg-red-500 rounded-l-none rounded-t-none'
            performAction={deleteExercise}>
            <TrashIcon className='w-4 h-4' />
          </LoggedExerciseActionButton>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default LoggedExerciseCard