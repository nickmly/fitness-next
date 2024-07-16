import React from 'react'
import { DropdownMenu, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { auth, signOut } from '@/auth'
import LogoutButton from './LogoutButton'


const AccountDropdown = async () => {
    const session = await auth()
    const performLogout = async () => {
        'use server'
        await signOut()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={session?.user?.image!} />
                    <AvatarFallback>My Account</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <LogoutButton performLogout={performLogout} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AccountDropdown