'use client'
import React from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface Props {
    performLogout: () => void
}

const LogoutButton = ({ performLogout }: Props) => {
    return (
        <DropdownMenuItem className='cursor-pointer' onClick={() => performLogout()}>
            Logout
        </DropdownMenuItem>
    )
}

export default LogoutButton