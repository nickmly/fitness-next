'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'

const ExerciseSearchBackButton = () => {
    const params = useParams()
    if (!params.muscle && !params.slug) {
        return
    }
    return (
        <Link href='/exercises'>
            <Button variant='outline' className='mb-5'>Go Back</Button>
        </Link>
    )
}

export default ExerciseSearchBackButton