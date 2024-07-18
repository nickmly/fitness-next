'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const LoginButton = () => {
    const router = useRouter()
    return (
        <Button data-testid='login-btn' onClick={() => router.push("/login")}>Login</Button>
    )
}

export default LoginButton