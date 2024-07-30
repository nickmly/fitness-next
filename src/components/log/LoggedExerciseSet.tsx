import { TypedSet } from '@prisma/client'
import React from 'react'
import { Button } from '../ui/button'
import { LoaderCircle, PencilIcon, TrashIcon } from 'lucide-react'

interface Props {
    loading: boolean
    set: TypedSet
    editSet: () => void
    deleteSet: () => void
}

const LoggedExerciseSet = ({ loading, set, editSet, deleteSet }: Props) => {
    return (
        <div className='bg-black/20 border-b-2 border-muted-foreground/30 flex justify-between'>
            <div className='px-4 py-2'>
                <span className='text-xl mx-1'>{set.weight}</span>
                <span className='text-muted-foreground'>lbs</span>
                <span className='mx-2'>x</span>
                <span className='text-xl mx-1'>{set.reps}</span>
                <span className='text-muted-foreground'>reps</span>
            </div>
            <div className='flex'>
                <Button title='Edit set' variant='edge' className='hover:bg-blue-500 rounded-none' onClick={() => editSet()}>
                    <PencilIcon className='w-4 h-4' />
                </Button>
                <Button title='Delete set' variant='edge' className='hover:bg-red-500 rounded-none' disabled={loading} onClick={() => deleteSet()}>
                    {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <TrashIcon className='w-4 h-4' />}
                </Button>
            </div>
        </div>
    )
}

export default LoggedExerciseSet