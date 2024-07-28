import { getDateWithoutTime } from '../../utils/date'

describe('date', () => {
    it('should format date without time', () => {
        // assuming Eastern Time zone
        const dt = new Date('2024-01-01T21:00:00')
        const result = getDateWithoutTime(dt)
        expect(result).toBe('2024-01-01')
    })
})