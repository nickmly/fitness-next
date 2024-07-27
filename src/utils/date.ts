import { formatISO, parseISO } from "date-fns";

export function formatDate(date: string) {
    return formatISO(parseISO(date), { representation: 'date' })
}