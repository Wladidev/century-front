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
import {
    Button,
    Col,
    Container,
    Grid,
    Input,
    Row,
    Text,
} from '@nextui-org/react'

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
        console.log('EEEE ===>', e)
        console.log('key ===>', key, value)

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
        <>
            <Head>
                <title>Login | Siglo 21</title>
                <meta
                    name="description"
                    content="Login para restaurant Siglo 21"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid.Container justify="center" css={{ height: '100vh' }}>
                <Grid
                    xs={11}
                    md={5}
                    lg={4}
                    css={{
                        mx: 'auto',
                        my: 'auto',
                        shadow: '$xl',
                        borderRadius: '$sm',
                        p: '$6',
                    }}
                >
                    <Grid.Container>
                        <Grid xs={12}>
                            <Text css={{ textAlign: 'center', flex: 1 }}>
                                Iniciar Sesión - Siglo 21
                            </Text>
                        </Grid>
                        <Grid xs={12}>
                            <Grid xs={8} css={{ mx: 'auto', my: '$14' }}>
                                <Input
                                    onChange={handleChangeLoginData}
                                    type="email"
                                    id="mail"
                                    itemID="mail"
                                    clearable
                                    css={{ width: '100%' }}
                                    bordered
                                    labelPlaceholder="Correo"
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12}>
                            <Grid
                                xs={8}
                                css={{ mx: 'auto', mt: '$6', mb: '$14' }}
                            >
                                <Input.Password
                                    clearable
                                    css={{ width: '100%' }}
                                    bordered
                                    id="password"
                                    onChange={handleChangeLoginData}
                                    type="password"
                                    labelPlaceholder="Contraseña"
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12}>
                            <Grid
                                xs={8}
                                css={{ mx: 'auto', mt: '$6', mb: '$14' }}
                            >
                                <Button
                                    onPress={handleLogin}
                                    css={{ mx: 'auto' }}
                                >
                                    Iniciar Sesión
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Login
