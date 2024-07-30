import { TypedSet } from "@prisma/client";
import { useMemo } from "react";

export function useSortedSets(sets: TypedSet[]) {
    const sortedSets = useMemo(() => {
        const clonedSets = [...sets]
        return clonedSets.sort((a, b) => {
            return a.created_at.getTime() - b.created_at.getTime()
        })
    }, [sets])
    return sortedSets
}