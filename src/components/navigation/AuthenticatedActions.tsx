import React from 'react'
import LoginButton from './LoginButton'
import AccountDropdown from './AccountDropdown'

interface Props {
    performLogin: () => void
    authenticated: boolean
}

const AuthenticatedActions = ({ performLogin, authenticated }: Props) => {
    return (
        <>
            {!authenticated ?
                <LoginButton performLogin={performLogin} /> :
                <AccountDropdown />
            }
        </>
    )
}

export default AuthenticatedActions