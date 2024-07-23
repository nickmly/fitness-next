'use server'
import { auth } from '@/auth'
import prisma from '../../../prisma/client'

export async function createOrGetLogOnDate(date: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return
    }
    const log = await prisma.log.findUnique({
        where: {
            date
        }
    })
    if (!log) {
        return await prisma.log.create({
            data: {
                date,
                userId: session.user.id
            }
        })
    }
    return log
}