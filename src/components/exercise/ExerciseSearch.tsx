'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { SearchIcon, XIcon } from 'lucide-react'
import { Exercise } from '@prisma/client'
import { searchExercises } from '@/app/actions/exercise'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'


const ExerciseSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debounceTimeout = useRef<NodeJS.Timeout | undefined>()
    const [foundExercises, setFoundExercises] = useState<Partial<Exercise>[]>([])
    const [isSearchOpen, setIsSearchOpen] = useState(false)
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

    const toggleSearch = (toggle: boolean) => {
        setIsSearchOpen(toggle)
        if (toggle) {
            document.body.classList.add("disable-scroll")
        } else {
            setSearchTerm('')
            document.body.classList.remove("disable-scroll")
        }
    }

    const onClickExercise = (exercise: Partial<Exercise>) => {
        toggleSearch(false)
        router.push(`/exercises/${exercise.slug}`)
    }

    return (
        isSearchOpen ?
            createPortal(
                <div className='fixed top-0 overflow-y-auto w-full h-full bg-black p-6'>
                    <div className='flex justify-center gap-2 w-full'>
                        <Input
                            className='w-full'
                            containerClassName='max-w-[1000px]'
                            autoFocus
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder='Search for an exercise'
                            start={<SearchIcon />}
                            end={<Button variant='clear' title='Close search' className='text-muted-foreground' onClick={() => toggleSearch(false)}><XIcon /></Button>}
                        />
                    </div>

                    {foundExercises.length > 0 &&
                        <div className='mt-5 flex flex-col gap-2 items-center w-full'>
                            {foundExercises.map(e => <Button variant='secondary' className='w-full max-w-[1000px] whitespace-normal' key={e.slug} onClick={() => onClickExercise(e)}>{e.name}</Button>)}
                        </div>
                    }
                </div>,
                document.body) :
            <Button variant='outline' className='mb-5 flex gap-2' title='Open search' onClick={() => toggleSearch(true)}>
                <SearchIcon />
                Search
            </Button>
    )
}

export default ExerciseSearch