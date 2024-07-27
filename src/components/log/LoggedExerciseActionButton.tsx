'use client'
import React from 'react'
import { Button } from '../ui/button'

interface Props {
    className?: string
    performAction: () => void
    children?: React.ReactNode
}

const LoggedExerciseActionButton = ({ className, performAction, children }: Props) => {
    return (
        <Button
            variant='edge'
            className={className}
            onClick={() => performAction()}>
            {children}
        </Button>
    )
}

export default LoggedExerciseActionButton