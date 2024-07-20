"use server"
import prisma from "../../../prisma/client"
export async function getExerciseBySlug(slug: string) {
    const exercise = await prisma.exercise.findUnique({
        where: {
            slug
        }
    })
    return exercise
}