'use client'
import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import ExerciseSearchModal from './ExerciseSearchModal'


const ExerciseSearch = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const toggleSearch = (toggle: boolean) => {
        setIsSearchOpen(toggle)
        if (toggle) {
            document.body.classList.add('disable-scroll')
        } else {
            document.body.classList.remove('disable-scroll')
        }
    }

    return (
        isSearchOpen ?
            <ExerciseSearchModal close={() => toggleSearch(false)} /> :
            <Button variant='outline' className='mb-5 flex gap-2' title='Open search' onClick={() => toggleSearch(true)}>
                <SearchIcon />
                Search
            </Button>
    )
}

export default ExerciseSearch