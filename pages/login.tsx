import { Button, Input } from 'components/form'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Login as LoginIcon } from '@resources'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'hooks'
import { handleLoginUser, handleLogout } from 'store/slices/login'
import { showAlert } from 'store/slices/alert'
import { useRouter } from 'next/router'

const Login: NextPage = ({}) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [login, setLogin] = useState({
        mail: '',
        password: '',
    })
    const dispatch = useAppDispatch()
    const logged = useAppSelector((state) => state.login.isLogged)
    const { mail, password } = login

    const handleChangeLoginData = (e: { target: HTMLInputElement }) => {
        const key = e.target.id
        const value = e.target.value

        setLogin((old) => ({ ...old, [key]: value }))
    }

    const handleLogin = async () => {
        console.log('Handle login')
        const resp = await dispatch(handleLoginUser(login))
        console.log('RESPONSE ===>', resp.payload)
        if (resp?.payload?.ok) {
            router.push('/')
        } else {
            dispatch(
                showAlert({
                    title: 'Ocurrío un error',
                    text: 'Por favor revisa tu correo y/o contraseña.',
                    type: 'error',
                })
            )
        }
    }

    return (
        <div>
            <Head>
                <title>Login | Siglo 21</title>
                <meta
                    name="description"
                    content="Login para restaurant Siglo 21"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen flex bg-gray-100">
                <div className="m-auto divide-x bg-white shadow-lg rounded-md flex-row flex">
                    <div className="my-auto bg-white  px-12 py-6 text-left">
                        <div className=" md:w-80">
                            <div className="">
                                <h1
                                    data-testid="login_title"
                                    className="font-black mb-6 text-center"
                                >
                                    {t('login.title')}
                                </h1>
                            </div>
                            <div>
                                <Input
                                    name={t('login.form.mail')}
                                    onChange={handleChangeLoginData}
                                    value={mail}
                                    type="text"
                                    id="mail"
                                />
                                <div className="mt-6">
                                    <Input
                                        name={t('login.form.password')}
                                        onChange={handleChangeLoginData}
                                        value={password}
                                        type="password"
                                        id="password"
                                    />
                                </div>
                                <Button
                                    style="text-center mt-6"
                                    type="primary"
                                    size="auto"
                                    text={t('login.login')}
                                    onClick={() => handleLogin()}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block bg-white  px-12 py-6 text-left">
                        <Image src={LoginIcon} width={200} height={400} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
