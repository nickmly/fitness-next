import { padNumber } from "./padNumber"

describe('padNumber', () => {
    it('should pad number less than 10', () => {
        const result = padNumber(9)
        expect(result).toBe('09')
    })
    it('should not pad number larger than 10', () => {
        const result = padNumber(11)
        expect(result).toBe('11')
    })
})