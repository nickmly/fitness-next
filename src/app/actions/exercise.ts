'use server'
import prisma from '../../../prisma/client'

export async function getExerciseBySlug(slug: string) {
    const exercise = await prisma.exercise.findUnique({
        where: {
            slug
        }
    })
    return exercise
}

export async function searchExercises(term: string) {
    const exercises = await prisma.exercise.findMany({
        where: {
            name: {
                contains: term,
                mode: 'insensitive'
            }
        }
    })
    return exercises
}