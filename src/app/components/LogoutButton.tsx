'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

interface Props {
    performLogout: () => void
}

const LogoutButton = ({ performLogout }: Props) => {
    return (
        <Button className='bg-transparent border-primary hover:bg-primary hover:text-background' variant='outline' onClick={() => performLogout()}>Logout</Button>
    )
}

export default LogoutButton