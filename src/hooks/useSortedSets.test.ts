import { TypedSet } from "@prisma/client"
import { subMinutes, addMinutes } from "date-fns"
import { useSortedSets } from "./useSortedSets"
import { renderHook } from "@testing-library/react"

const mockSets: TypedSet[] = [
    {
        created_at: new Date(),
        id: '2',
        weight: 20,
        reps: 10,
        loggedExerciseId: '4567',
        type: "WEIGHT_REPS",
        distance: null,
        minutes: null,
        seconds: null
    },
    {
        created_at: addMinutes(new Date(), 1),
        id: '3',
        weight: 20,
        reps: 10,
        loggedExerciseId: '7890',
        type: "WEIGHT_REPS",
        distance: null,
        minutes: null,
        seconds: null
    },
    {
        created_at: subMinutes(new Date(), 1),
        id: '1',
        weight: 20,
        reps: 10,
        loggedExerciseId: '1234',
        type: "WEIGHT_REPS",
        distance: null,
        minutes: null,
        seconds: null
    },
]


describe('useSortedSets', () => {
    it('should sort sets by date', () => {
        const { result } = renderHook(() => useSortedSets(mockSets))
        const mappedResult = result.current.map(s => s.id)
        expect(mappedResult).toStrictEqual(['1', '2', '3'])
    })
})