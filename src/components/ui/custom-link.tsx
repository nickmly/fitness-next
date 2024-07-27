import React from 'react'
import Link, { LinkProps } from 'next/link'

export interface Props extends LinkProps {
    children?: React.ReactNode
}

const CustomLink = (props: Props) => {
    return (
        <Link
            {...props}
            className='hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-md'>
            {props.children}
        </Link>
    )
}

export default CustomLink