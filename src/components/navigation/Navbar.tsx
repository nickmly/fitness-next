import React from 'react'
import { auth, signIn } from "@/auth"
import MenuSheet from './MenuSheet'
import AuthenticatedActions from './AuthenticatedActions'

const Navbar = async () => {
    const session = await auth()
    return (
        <nav className='bg-secondary p-6 text-white flex justify-between'>
            <MenuSheet />
            <AuthenticatedActions
                authenticated={session?.user !== undefined}
                performLogin={async () => {
                    'use server'
                    await signIn()
                }}
            />
        </nav>
    )
}

export default Navbar