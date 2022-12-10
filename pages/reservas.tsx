import { Button, Grid, Input, Text } from '@nextui-org/react'
import { Navbar } from 'components/navbar'
import CardReserva from 'components/reservas/CardReserva'
import { useAppSelector } from 'hooks'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showAlert } from 'store/slices/alert'
import { deleteReservation, IReservation } from 'store/slices/reservation'
import { getReservationsByEmail } from 'utils'

const Reservas: NextPage = () => {
    const [mail, setMail] = useState('')
    const [findedReservations, setFinded] = useState([])

    const { reservations } = useAppSelector((state) => state.reservation)
    const dispatch = useDispatch()

    const handleShowReservations = () => {
        setFinded(getReservationsByEmail(reservations, mail))
    }

    const handleDeleteReservation = (reservation: IReservation) => {
        dispatch(
            showAlert({
                title: '¿Estás seguro que deseas cancerlar tú reserva?',
                text: 'Esta acción es irreversible.',
                buttons: {
                    confirmText: 'Cancelar reserva',
                    onConfirm: () => {
                        dispatch(deleteReservation({ date: reservation?.date }))
                        location.reload()
                    },
                    cancelText: 'Volver',
                },
            })
        )
    }

    return (
        <div>
            <Head>
                <title>Mis reservas | Siglo 21</title>
                <meta
                    name="description"
                    content="Pedir | restaurant Siglo 21"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <Grid.Container css={{ px: '$12' }}>
                <Grid css={{ my: '$12' }} justify="center" xs={12}>
                    <Text b h3>
                        Tus reservas
                    </Text>
                </Grid>
                <Grid css={{ mb: '$12' }} xs={12}>
                    <Text b h5>
                        Para que puedas ver tus reservas debes ingresar tu
                        correo
                    </Text>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Input
                        css={{ width: '100%' }}
                        onChange={(e) => setMail(e.target.value)}
                    />
                </Grid>
                <Grid xs={12} css={{ my: '$12' }}>
                    <Button onPress={handleShowReservations} color="success">
                        Buscar mis reservas
                    </Button>
                </Grid>
                <Grid.Container>
                    {findedReservations.map((reservation) => (
                        <CardReserva
                            onPressDelete={handleDeleteReservation}
                            reservation={reservation}
                        />
                    ))}
                </Grid.Container>
            </Grid.Container>
        </div>
    )
}

export default Reservas
