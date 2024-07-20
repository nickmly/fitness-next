import React from 'react'
import { auth, providerMap, signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import GitHubIcon from '@/svgr/github';
import GoogleIcon from '@/svgr/google';

interface ProviderIconMap {
    [key: string]: any
}

const providerIcons: ProviderIconMap = {
    'github': <GitHubIcon className='fill-secondary w-6 h-6' />,
    'google': <GoogleIcon className='fill-secondary w-6 h-6' />
}

const renderProviderIcon = (id: string) => {
    return providerIcons[id]
}

const LoginPage = async () => {
    const session = await auth()
    if (session?.user) {
        redirect("/")
    }
    return (
        <div className='flex flex-col gap-2'>
            {Object.values(providerMap).map((provider) => (
                <form
                    key={provider.id}
                    action={async () => {
                        'use server'
                        try {
                            await signIn(provider.id)
                        } catch (error) {
                            // Signin can fail for a number of reasons, such as the user
                            // not existing, or the user not having the correct role.
                            // In some cases, you may want to redirect to a custom error
                            if (error instanceof AuthError) {
                                // TODO: implement this
                                // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                            }

                            // Otherwise if a redirects happens NextJS can handle it
                            // so you can just re-thrown the error and let NextJS handle it.
                            // Docs:
                            // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                            throw error
                        }
                    }}
                >
                    <Button type='submit' className='flex gap-2'>
                        {renderProviderIcon(provider.id)}
                        <span>Sign in with {provider.name}</span>
                    </Button>
                </form>
            ))}
        </div>
    )
}

export default LoginPage