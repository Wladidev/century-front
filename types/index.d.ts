// Login

type roles = 'waiter' | 'chef' | 'admin' | 'finance'

export interface LoginResponse {
    ok: boolean
    mail?: string
    name?: string
    lastName?: string
    roles?: Array<roles | any>
}
