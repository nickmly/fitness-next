import AuthenticatedActions from '@/components/navigation/AuthenticatedActions'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

jest.mock('../components/navigation/AccountDropdown', () => {
    return () => <div data-testid='account-dropdown' />
})

describe('AuthenticatedActions', () => {
    it('should render the component', async () => {
        const result = render(<AuthenticatedActions performLogin={() => { }} authenticated={false} />)
        expect(result).toBeDefined()
    })
    it('should render the sign in button when not authenticated', async () => {
        render(<AuthenticatedActions performLogin={() => { }} authenticated={false} />)
        const loginBtn = screen.getByTestId('login-btn')
        expect(loginBtn).toBeDefined()
    })
    it('should render the account dropdown when authenticated', async () => {
        render(<AuthenticatedActions performLogin={() => { }} authenticated={true} />)
        const accountDropdown = screen.getByTestId('account-dropdown')
        expect(accountDropdown).toBeDefined()
    })
})