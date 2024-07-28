import ExerciseSearchButton from '@/components/exercise/ExerciseSearchButton'
import { render, fireEvent, screen } from '@testing-library/react'

jest.mock('./ExerciseSearchModal', () => {
    const MockExerciseSearchModal = () => <div data-testid='modal' />
    return MockExerciseSearchModal
})

describe('ExerciseSearchButton', () => {
    it('should render the search button', async () => {
        const component = render(
            <ExerciseSearchButton
                variant='default'
                buttonIcon={<div />}
                buttonTitle='title'
                buttonLabel='label'
                onClickExercise={() => jest.fn()}
            />
        )
        const result = screen.findByText('label')
        expect(result).toBeDefined()
    })
    it('should open the search modal on click', async () => {
        render(
            <ExerciseSearchButton
                variant='default'
                buttonIcon={<div />}
                buttonTitle='title'
                buttonLabel='label'
                onClickExercise={() => jest.fn()}
            />
        )
        fireEvent.click(screen.getByText('label'))
        const result = await screen.findByTestId('modal')
        expect(result).toBeDefined()
    })
})