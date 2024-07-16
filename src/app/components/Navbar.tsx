import React from 'react'
import { Dumbbell } from 'lucide-react'
import { auth, signIn } from "@/auth"
import LoginButton from './LoginButton'
import AccountDropdown from './AccountDropdown'
import MenuSheet from './MenuSheet'

const Navbar = async () => {
    const session = await auth()
    return (
        <nav className='bg-secondary p-6 text-white flex justify-between'>
            <MenuSheet />
            {!session?.user ?
                <LoginButton performLogin={
                    async () => {
                        'use server'
                        await signIn()
                    }
                } /> :
                <AccountDropdown />
            }

        </nav>
    )
}

export default Navbar