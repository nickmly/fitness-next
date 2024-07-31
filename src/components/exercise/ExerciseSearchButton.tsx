'use client'
import React, { useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import ExerciseSearchModal from './ExerciseSearchModal'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import { Exercise, LoggedExercise } from '@prisma/client'
import { useToast } from '../ui/use-toast'

interface Props extends VariantProps<typeof buttonVariants> {
    className?: string
    buttonTitle: string
    buttonLabel: string
    buttonIcon: React.ReactElement
    onClickExercise: (e: Partial<Exercise>) => Promise<false | LoggedExercise | undefined>
}

const ExerciseSearchButton = ({ variant, className, buttonTitle, buttonLabel, buttonIcon, onClickExercise }: Props) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { toast } = useToast()

    const toggleSearch = (toggle: boolean) => {
        setIsSearchOpen(toggle)
        if (toggle) {
            document.body.classList.add('disable-scroll')
        } else {
            document.body.classList.remove('disable-scroll')
        }
    }

    const performServerAction = async (e: Partial<Exercise>) => {
        const result = await onClickExercise(e)
        if (result === false) {
            toast({
                variant: 'destructive',
                title: 'Something went wrong',
            })
        }
    }

    return (
        isSearchOpen ?
            <ExerciseSearchModal
                onClickExercise={(e) => performServerAction(e)}
                close={() => toggleSearch(false)}
            /> :
            <Button variant={variant} className={cn(className, 'mb-5 flex gap-2')} title={buttonTitle} onClick={() => toggleSearch(true)}>
                {buttonIcon}
                {buttonLabel}
            </Button>
    )
}

export default ExerciseSearchButton