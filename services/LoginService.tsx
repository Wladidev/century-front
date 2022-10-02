import { LoginResponse } from 'types'

interface params {
    mail: string
    password: string
}

const test_users = [
    {
        mail: 'wladimir.barra@siglo21.cl',
        name: 'Wladimir',
        lastName: 'Barra',
        roles: ['waiter'],
    },
    {
        mail: 'prueba@siglo21.cl',
        name: 'Wladimir',
        lastName: 'Barra',
        roles: ['chef'],
    },
    {
        mail: 'admin@siglo21.cl',
        name: 'Wladimir',
        lastName: 'Barra',
        roles: ['admin'],
    },
]

export const LoginService = ({
    mail,
    password,
}: params): Promise<LoginResponse> => {
    throw new Error('Contrase{a incorrecta')
    if (test_users.some((user) => user.mail === mail)) {
        const user = test_users.find((u) => u.mail === mail)
        return new Promise<LoginResponse>((res, rej) => {
            res({ ok: true, ...user })
        })
    } else
        return new Promise<LoginResponse>((res, rej) => {
            res({ ok: false })
        })
}
