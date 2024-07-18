import React from 'react'
import LoginButton from './LoginButton'
import AccountDropdown from './AccountDropdown'

interface Props {
    authenticated: boolean
}

const AuthenticatedActions = ({ authenticated }: Props) => {
    return (
        <>
            {!authenticated ?
                <LoginButton /> :
                <AccountDropdown />
            }
        </>
    )
}

export default AuthenticatedActions