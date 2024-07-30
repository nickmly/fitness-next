import { auth } from "@/auth"
import { TypedSet } from "@prisma/client"
import prisma from "../../../prisma/client"

export async function updateSet(set: TypedSet) {
    const session = await auth()
    if (!session?.user?.id) {
        return
    }
    return await prisma.typedSet.update({
        where: {
            id: set.id
        },
        data: {
            ...set
        }
    })
}

export async function deleteSet(setId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        return
    }
    await prisma.typedSet.delete({
        where: {
            id: setId
        }
    })
    return true
}