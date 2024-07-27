'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'

interface Props {
    className?: string
    performAction: () => Promise<void>
    children?: React.ReactNode
}

const LoggedExerciseActionButton = ({ className, performAction, children }: Props) => {
    const [actionLoading, setActionLoading] = useState(false)
    return (
        <Button
            variant='edge'
            disabled={actionLoading}
            className={className}
            onClick={async () => {
                setActionLoading(true)
                await performAction()
                setActionLoading(false)
            }}>
            {!actionLoading ? children : <LoaderCircle className='animate-spin w-4 h-4' />}
        </Button >
    )
}

export default LoggedExerciseActionButton