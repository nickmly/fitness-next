import AuthenticatedActions from '@/components/navigation/AuthenticatedActions'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

jest.mock('../../components/navigation/AccountDropdown', () => {
    const MockAccountDropdown = () => <div data-testid='account-dropdown' />
    return MockAccountDropdown
})

jest.mock('next/navigation', () => ({
    useRouter() {
        return jest.fn()
    }
}))


describe('AuthenticatedActions', () => {
    it('should render the component', async () => {
        const result = render(<AuthenticatedActions authenticated={false} />)
        expect(result).toBeDefined()
    })
    it('should render the sign in button when not authenticated', async () => {
        render(<AuthenticatedActions authenticated={false} />)
        const loginBtn = screen.getByTestId('login-btn')
        expect(loginBtn).toBeDefined()
    })
    it('should render the account dropdown when authenticated', async () => {
        render(<AuthenticatedActions authenticated={true} />)
        const accountDropdown = screen.getByTestId('account-dropdown')
        expect(accountDropdown).toBeDefined()
    })
})