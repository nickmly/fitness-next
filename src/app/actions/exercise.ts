'use server'
import prisma from '../../../prisma/client'

export async function getExerciseBySlug(slug: string) {
    const exercise = await prisma.exercise.findUnique({
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
    return exercise
}

export async function searchExercises(term: string) {
    const exercises = await prisma.exercise.findMany({
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
    return exercises
}