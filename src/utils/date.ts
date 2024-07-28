export function getDateWithoutTime(date: Date) {
    const offsetInMs = date.getTimezoneOffset() * 60000
    return new Date(date.valueOf() - offsetInMs).toISOString().split('T')[0]
}

