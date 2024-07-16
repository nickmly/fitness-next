'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

interface Props {
    performLogin: () => void
}

const LoginButton = ({ performLogin }: Props) => {
    return (
        <Button onClick={() => performLogin()}>Login</Button>
    )
}

export default LoginButton