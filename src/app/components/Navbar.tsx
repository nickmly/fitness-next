import React from 'react'
import { Dumbbell } from 'lucide-react'
import { auth, signIn, signOut } from "@/auth"
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const Navbar = async () => {
    const session = await auth()
    return (
        <nav className='bg-secondary p-6 text-white flex justify-between'>
            <div className='flex gap-2 items-center'>
                <Dumbbell className="w-8 h-8" />
                <h1 className='text-2xl'>nextFitness</h1>
            </div>
            {!session?.user ?
                <LoginButton performLogin={
                    async () => {
                        'use server'
                        await signIn('google')
                    }
                } /> :
                <LogoutButton performLogout={
                    async () => {
                        'use server'
                        await signOut()
                    }
                } />
            }

        </nav>
    )
}

export default Navbar