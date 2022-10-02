// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import Login from '../pages/login'

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        }
    },
}))

jest.mock('services/LoginService', () => ({
    LoginService: () => Promise.resolve({ ok: false }),
}))

jest.mock('hooks/useTestHook', () => ({
    useTestHook: () => false,
}))

describe('Home', () => {
    it('renders a login', () => {
        const { container } = render(<Login />)

        expect(container).toMatchSnapshot()
    })

    it('Should have a login text', async () => {
        render(<Login />)

        const pr = await screen.findByText('login.title')

        expect(pr).toHaveTextContent('login.title')
    })

    it('Should not log on user if login service return ok false', async () => {
        render(<Login />)
        const pr = await screen.findByTestId('isLogged')

        expect(pr).toHaveTextContent('true')
    })
})
