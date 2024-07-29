'use client'
// Need to use a client component on this page in order to get the correct time zone from the browser
import { getDateWithoutTime } from '@/utils/date'
import { useRouter } from 'next/navigation'

const LogPage = () => {
    const date = getDateWithoutTime(new Date())
    useRouter().replace(`/log/${date}`)
}

export default LogPage