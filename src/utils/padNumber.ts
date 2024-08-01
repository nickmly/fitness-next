export function padNumber(num: number) {
    return num <= 9 ? `0${num.toString()}` : num.toString()
}