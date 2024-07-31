import { auth } from "@/auth"
import { TypedSet } from "@prisma/client"
import prisma from "../../../prisma/client"

export async function updateSet(set: TypedSet) {
    const session = await auth()
    if (!session?.user?.id) {
        return false
    }
    try {
        return await prisma.typedSet.update({
            where: {
                id: set.id
            },
            data: {
                ...set
            }
        })
    }
    catch (e) {
        return false
    }
}

export async function deleteSet(setId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return false
    }
    try {
        await prisma.typedSet.delete({
            where: {
                id: setId
            }
        })
        return true
    }
    catch (e) {
        return false
    }
}