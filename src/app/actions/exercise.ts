'use server'
import prisma from '../../../prisma/client'

export async function getExerciseBySlug(slug: string) {
    try {
        return await prisma.exercise.findUnique({
            select: {
                slug: true,
                name: true,
                equipment: true,
                primaryMuscles: true,
                secondaryMuscles: true,
                instructions: true,
                images: true
            },
            where: {
                slug
            }
        })
    }
    catch (e) {
        return false
    }
}

export async function searchExercises(term: string) {
    try {
        return await prisma.exercise.findMany({
            select: {
                slug: true,
                name: true,
            },
            where: {
                name: {
                    contains: term,
                    mode: 'insensitive'
                }
            }
        })
    }
    catch (e) {
        return false
    }
}

export async function getExercisesByMuscle(muscle: string) {
    muscle = muscle.replace('-', ' ')
    try {
        return await prisma.exercise.findMany({
            select: {
                slug: true,
                name: true
            },
            where: {
                OR: [
                    {
                        primaryMuscles: {
                            has: muscle
                        }
                    },
                    {
                        secondaryMuscles: {
                            has: muscle
                        }
                    }
                ]
            }
        })
    }
    catch (e) {
        return false
    }
}

