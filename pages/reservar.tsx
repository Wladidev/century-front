import { Button, Grid, Radio, Text } from '@nextui-org/react'
import { NextPage } from 'next'
import Head from 'next/head'
import Lottie from 'lottie-react'
import Image from 'next/image'
import { ReservationAnimation } from 'resources/animations'
import Calendar from 'react-calendar'
import Select from 'react-select'
import { useState } from 'react'
import {
    changeTimeToDate,
    checkDateExists,
    getRandomNumber,
    getReservationTimes,
} from 'utils'
import { useAppDispatch, useAppSelector } from 'hooks'
import { addReservation } from 'store/slices/reservation'
import { showAlert } from 'store/slices/alert'
import { Navbar } from 'components/navbar'
import { TableModal } from 'components/pedir/TableModal'

const options = [
    { value: 1, label: 'Una persona' },
    { value: 2, label: 'Dos personas' },
    { value: 3, label: 'Tres personas' },
    { value: 4, label: 'Cuatro personas' },
    { value: 5, label: 'Cinco personas' },
    { value: 6, label: 'Seis personas' },
    { value: 7, label: 'Siete personas' },
    { value: 8, label: 'Ocho personas' },
    { value: 9, label: 'Nueve personas' },
    { value: 10, label: 'Diez personas' },
]

const Reservar: NextPage<any> = () => {
    const [reservation, setReservation] = useState({
        date: undefined,
        time: undefined,
        persons: undefined,
    })
    const [showModal, setShowModal] = useState(false)
    const { date, time, persons } = reservation

    const { reservations } = useAppSelector((state) => state.reservation)
    const dispatch = useAppDispatch()

    function addMonth(date: Date) {
        var d = new Date(date)
        d.setMonth(d.getMonth() + 1)
        return d
    }

    const disabled = !date || !time || !persons

    const handleAddReservation = () => {
        const isInReservations = checkDateExists(date, reservations)
        if (!isInReservations) {
            setShowModal(true)
        } else {
            dispatch(
                showAlert({
                    title: 'Esta hora ya esta reservada',
                    type: 'error',
                    text: 'Intenta reservando otra.',
                })
            )
        }
    }

    const handleContinue = (mail) => {
        dispatch(
            addReservation({
                reservation: { ...reservation, mail, table: getRandomNumber() },
            })
        )
        dispatch(
            showAlert({
                title: 'Reserva exitosa',
                text: 'Has hecho tu reserva de manera exitosa',
            })
        )
        setShowModal(false)
    }

    return (
        <div>
            <Head>
                <title>Reservar | Siglo 21</title>
                <meta
                    name="description"
                    content="Pedir | restaurant Siglo 21"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <TableModal
                type="reservation"
                show={showModal}
                onContinue={handleContinue}
            />
            <Grid.Container>
                <Grid justify="center" xs={12} css={{ flex: 1 }}>
                    <Text
                        css={{ textAlign: 'center', zIndex: 10, m: '$12' }}
                        b
                        h2
                    >
                        Haz tu reserva en Siglo 21
                    </Text>
                </Grid>
                <Grid.Container>
                    <Lottie
                        style={{ width: 200, height: 200, flex: 1 }}
                        animationData={ReservationAnimation}
                    />
                </Grid.Container>
                <Grid.Container css={{ my: '$12' }} justify="center">
                    <Grid css={{ mb: '$12' }} justify="center" xs={12}>
                        <Text>¿Para cuantas personas deseas reservar?</Text>
                    </Grid>
                    <Grid
                        justify="center"
                        css={{ flex: 1, flexDirection: 'column', px: '$24' }}
                        xs={12}
                        md={6}
                    >
                        <Select
                            placeholder="Selecciona"
                            onChange={(v) =>
                                setReservation((old) => ({
                                    ...old,
                                    persons: v?.value,
                                }))
                            }
                            options={options}
                        />
                    </Grid>
                </Grid.Container>
                <Grid.Container justify="center">
                    <Grid css={{ mb: '$12' }} justify="center" xs={12}>
                        <Text>Selecciona la fecha</Text>
                    </Grid>
                    <Grid xs={12} justify="center">
                        <Calendar
                            minDate={
                                new Date(
                                    new Date().setDate(new Date().getDate() + 1)
                                )
                            }
                            onChange={(v) =>
                                setReservation((old) => ({ ...old, date: v }))
                            }
                            maxDate={addMonth(new Date())}
                            value={reservation.date}
                        />
                    </Grid>
                    {date && persons && (
                        <>
                            <Grid css={{ my: '$12' }} justify="center" xs={12}>
                                <Text>Selecciona la hora</Text>
                            </Grid>
                            <Grid
                                justify="center"
                                css={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    px: '$24',
                                    mt: '$12',
                                }}
                                xs={12}
                                md={6}
                            >
                                <Select
                                    placeholder="Selecciona"
                                    onChange={(v) =>
                                        setReservation((old) => ({
                                            ...old,
                                            date: changeTimeToDate(
                                                date,
                                                v?.value
                                            ),
                                            time: v?.value,
                                        }))
                                    }
                                    options={getReservationTimes()}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid css={{ mt: '$12' }} xs={12} justify="center">
                        <Button
                            onClick={handleAddReservation}
                            disabled={disabled}
                            color="success"
                        >
                            Reservar
                        </Button>
                    </Grid>
                </Grid.Container>
                <Grid.Container css={{ mt: '$12' }} justify="center">
                    <Grid xs={12} justify="center">
                        <Text css={{ textAlign: 'center' }} h3>
                            Sobre Siglo 21
                        </Text>
                    </Grid>
                    <Grid justify="center" xs={12} md={6}>
                        <Text css={{ textAlign: 'center', px: '$6' }}>
                            A pasos del Museo Bellas Artes en Santiago Centro,
                            Siglo 21 es un restaurante ubicado en Loreto 40,
                            esquina Bellavista, en la comuna de Recoleta. Un
                            restaurante con una singular propuesta de “cocina
                            peruana travesti”, que busca vestir las
                            tradicionales preparaciones de la gastronomía
                            peruana con otras culturas de alrededor del mundo
                            logrando fusiones únicas y deliciosas. Una increíble
                            terraza, con una carta especial orientada a piqueos
                            y los platos más pedidos, una amplia barra con una
                            carta de tragos excepcionales y dos pisos de salón
                            te esperan para disfrutar en un ambiente kitsch y
                            único dentro de la oferta gastronómica de los
                            mejores restaurantes en Santiago de Chile.
                        </Text>
                    </Grid>
                </Grid.Container>
            </Grid.Container>
        </div>
    )
}

export default Reservar
