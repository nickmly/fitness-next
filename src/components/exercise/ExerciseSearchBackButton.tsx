'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const ExerciseSearchBackButton = () => {
    const params = useParams()
    if (!params.muscle && !params.slug) {
        return
    }
    return (
        <Link href='/exercises'>

            <Button variant='outline' className='flex gap-2 items-center mb-5'>
                <ArrowLeft />Go Back
            </Button>
        </Link>
    )
}

export default ExerciseSearchBackButton