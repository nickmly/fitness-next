import { Exercise, LoggedExercise } from '@prisma/client'
import React from 'react'

interface Props {
  loggedExercise: LoggedExercise & {
    exercise: Exercise | null
  }
}

const LoggedExerciseCard = ({ loggedExercise }: Props) => {
  return (
    <div className='bg-muted rounded-lg p-4'>
      {loggedExercise.exercise && loggedExercise.exercise.name}
    </div>
  )
}

export default LoggedExerciseCard