'use client'
import React, { useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import ExerciseSearchModal from './ExerciseSearchModal'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'

interface Props extends VariantProps<typeof buttonVariants> {
    className?: string
    buttonTitle: string
    buttonLabel: string
    buttonIcon: React.ReactElement
}

const ExerciseSearchButton = ({ variant, className, buttonTitle, buttonLabel, buttonIcon }: Props) => {
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
            <Button variant={variant} className={cn(className, 'mb-5 flex gap-2')} title={buttonTitle} onClick={() => toggleSearch(true)}>
                {buttonIcon}
                {buttonLabel}
            </Button>
    )
}

export default ExerciseSearchButton