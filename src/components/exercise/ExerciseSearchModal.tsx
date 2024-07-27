'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SearchIcon, XIcon } from 'lucide-react'
import { searchExercises } from '@/app/actions/exercise'
import { Exercise } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

interface Props {
    close: () => void
}

const ExerciseSearchModal = ({ close }: Props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const debounceTimeout = useRef<NodeJS.Timeout | undefined>()
    const [foundExercises, setFoundExercises] = useState<Partial<Exercise>[]>([])
    const router = useRouter()

    useEffect(() => {
        async function performSearch() {
            const exercises = await searchExercises(searchTerm)
            setFoundExercises(exercises)
        }
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
        }
        if (searchTerm === "") {
            setFoundExercises([])
        } else {
            debounceTimeout.current = setTimeout(() => {
                performSearch()
            }, 500)
        }
    }, [searchTerm])


    const closeSearch = () => {
        close()
        setSearchTerm('')
    }

    const onClickExercise = (exercise: Partial<Exercise>) => {
        router.push(`/exercises/${exercise.slug}`)
        closeSearch()
    }

    return (
        createPortal(<div className='fixed top-0 overflow-y-auto w-full h-full bg-black p-6'>
            <div className='flex justify-center gap-2 w-full'>
                <Input
                    className='w-full'
                    containerClassName='max-w-[1000px]'
                    autoFocus
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder='Search for an exercise'
                    start={<SearchIcon />}
                    end={<Button variant='clear' title='Close search' className='text-muted-foreground' onClick={() => closeSearch()}><XIcon /></Button>}
                />
            </div>

            {foundExercises.length > 0 &&
                <div className='mt-5 flex flex-col gap-2 items-center w-full'>
                    {foundExercises.map(e => <Button variant='secondary' className='w-full max-w-[1000px] whitespace-normal' key={e.slug} onClick={() => onClickExercise(e)}>{e.name}</Button>)}
                </div>
            }
        </div>, document.body)
    )
}

export default ExerciseSearchModal