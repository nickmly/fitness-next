'use server'
import { auth } from '@/auth'
import prisma from '../../../prisma/client'

export async function findOrCreateLogOnDate(date: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return
    }
    const log = await prisma.log.findFirst({
        select: {
            date: true,
            userId: true,
            exercises: {
                include: {
                    exercise: true
                }
            }
        },
        where: {
            date,
            userId: session.user.id
        }
    })
    if (!log) {
        return await prisma.log.create({
            select: {
                date: true,
                userId: true,
                exercises: {
                    include: {
                        exercise: true
                    }
                }
            },
            data: {
                date,
                userId: session.user.id
            }
        })
    }
    return log
}

export async function addExerciseToLog(exerciseSlug: string, logId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return
    }
}