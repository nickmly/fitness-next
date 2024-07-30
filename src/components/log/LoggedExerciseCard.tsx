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
import LoggedExerciseSet from './LoggedExerciseSet'

interface LoggedExerciseWithExercise extends LoggedExercise {
  exercise: Exercise | null
  sets: TypedSet[]
}

interface Props {
  loggedExercise: LoggedExerciseWithExercise
  deleteExercise: () => Promise<void>
  createSet: (set: TypedSetFormValues) => Promise<void>
  updateSet: (set: TypedSet) => Promise<void>
  deleteSet: (setId: string) => Promise<void>
}

const LoggedExerciseCard = ({ loggedExercise, deleteExercise, createSet, updateSet, deleteSet }: Props) => {
  const [showSetForm, setShowSetForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteSetLoading, setDeleteSetLoading] = useState<string>('')
  const [currentSetToEdit, setCurrentSetToEdit] = useState<TypedSet>()
  return (
    <AccordionItem value={loggedExercise.id} className='bg-muted rounded-lg'>
      <AccordionTrigger className='px-4 py-2'>
        {loggedExercise.exercise?.name}
      </AccordionTrigger>
      <AccordionContent className='flex flex-col p-0'>
        {showSetForm &&
          <LoggedExerciseSetForm
            loading={loading}
            existingSet={currentSetToEdit}
            createSet={
              async (set: TypedSetFormValues) => {
                setLoading(true)
                await createSet(set)
                setLoading(false)
                setShowSetForm(false)
              }
            }
            updateSet={
              async (set: TypedSet) => {
                setLoading(true)
                await updateSet(set)
                setLoading(false)
                setShowSetForm(false)
              }
            }
          />
        }
        {!showSetForm && loggedExercise.sets.map(s =>
          <LoggedExerciseSet
            loading={s.id === deleteSetLoading}
            key={s.id}
            set={s}
            editSet={
              () => {
                setCurrentSetToEdit(s)
                setShowSetForm(true)
              }
            }
            deleteSet={
              async () => {
                setDeleteSetLoading(s.id)
                await deleteSet(s.id)
                setDeleteSetLoading('')
              }
            }
          />
        )}
        {!showSetForm &&
          <div className='flex w-full'>
            <LoggedExerciseActionButton
              title="Add set"
              className='w-full hover:bg-green-600 rounded-r-none rounded-t-none'
              performAction={async () => {
                setShowSetForm(true)
              }}>
              <CirclePlusIcon className='w-4 h-4' />
              <span className='ml-2'>Add set</span>
            </LoggedExerciseActionButton>
            <LoggedExerciseActionButton
              title="Delete exercise"
              className='w-full hover:bg-red-500 rounded-l-none rounded-t-none'
              performAction={deleteExercise}>
              <TrashIcon className='w-4 h-4' />
              <span className='ml-2'>Delete exercise</span>
            </LoggedExerciseActionButton>
          </div>
        }
      </AccordionContent>
    </AccordionItem>
  )
}

export default LoggedExerciseCard