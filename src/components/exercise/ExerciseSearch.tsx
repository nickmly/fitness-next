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
    const [foundExercises, setFoundExercises] = useState<Exercise[]>([])
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
            document.body.classList.remove("disable-scroll")
        }
    }

    const onClickExercise = (exercise: Exercise) => {
        router.push(`/exercises/${exercise.slug}`)
        toggleSearch(false)
    }

    return (
        isSearchOpen ?
            createPortal(
                <div className='fixed top-0 overflow-y-auto w-full h-full bg-black/95 p-6'>
                    <div className='flex gap-2'>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder='Search for an exercise'
                            startIcon={<SearchIcon />}
                        />
                        <Button variant='outline' onClick={() => toggleSearch(false)}>
                            <XIcon />
                        </Button>
                    </div>

                    {foundExercises.length > 0 &&
                        <div className='mt-5 flex flex-col gap-2 justify-start'>
                            {foundExercises.map(e => <Button key={e.slug} onClick={() => onClickExercise(e)}>{e.name}</Button>)}
                        </div>
                    }
                </div>,
                document.body) :
            <Button variant="outline" className='mb-5 flex gap-2' onClick={() => toggleSearch(true)}>
                <SearchIcon />
                Search
            </Button>
    )
}

export default ExerciseSearch