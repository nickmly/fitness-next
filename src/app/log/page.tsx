'use client'
import { getDateWithoutTime } from '@/utils/date'
import { useRouter } from 'next/navigation'

const LogPage = () => {
    const date = getDateWithoutTime(new Date())
    useRouter().replace(`/log/${date}`)
}

export default LogPage