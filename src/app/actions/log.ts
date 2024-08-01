'use server'
import { auth } from '@/auth'
import prisma from '../../../prisma/client'
import { Prisma } from '@prisma/client'

export async function findOrCreateLogOnDate(date: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return false
    }
    try {
        const log = await prisma.log.findFirst({
            select: {
                id: true,
                date: true,
                userId: true,
                exercises: {
                    include: {
                        exercise: true,
                        sets: true
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
                    id: true,
                    date: true,
                    userId: true,
                    exercises: {
                        include: {
                            exercise: true,
                            sets: true
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
    catch (e) {
        return false
    }
}

export async function addExerciseToLog(exerciseSlug: string, logId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return false
    }
    try {
        const loggedExercise = await prisma.loggedExercise.create({
            data: {
                exerciseSlug,
                logId
            }
        })
        return loggedExercise
    }
    catch (e) {
        return false
    }

}

export async function deleteExerciseFromLog(loggedExerciseId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return false
    }
    try {
        await prisma.loggedExercise.delete({
            where: {
                id: loggedExerciseId
            }
        })
        return true
    }
    catch (e) {
        return false
    }
}

export async function addSetToLoggedExercise(loggedExerciseId: string, set: Partial<Prisma.TypedSetCreateInput>) {
    const session = await auth()
    if (!session?.user?.id) {
        return false
    }
    try {
        await prisma.typedSet.create({
            data: {
                created_at: new Date(),
                loggedExerciseId,
                type: set.type,
                weight: set.weight,
                reps: set.reps,
                distance: set.distance,
                minutes: set.minutes,
                seconds: set.seconds
            }
        })
        return true
    }
    catch (e) {
        return false
    }
}

