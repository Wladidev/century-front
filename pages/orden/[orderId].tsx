import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { Grid, Text } from '@nextui-org/react'
import { Stepper, Step } from 'react-form-stepper'
import {
    MakingOrder,
    OrderDelivered,
    OrderInProcess,
} from 'resources/animations'

const Order = () => {
    const router = useRouter()
    const { isReady } = router
    const { orderId } = router.query

    const [orderStatus, setOrderStatus] = useState(3)

    const animation = {
        1: OrderInProcess,
        2: MakingOrder,
        3: OrderDelivered,
    }

    useEffect(() => {
        console.log('Order id ====>', orderId)
    }, [isReady, orderId])
    return (
        <div>
            <Head>
                <title>Orden | Siglo 21</title>
                <meta
                    name="description"
                    content="Pedir | restaurant Siglo 21"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid.Container css={{ mt: '$18' }}>
                <Grid xs={12}>
                    <Text
                        css={{ textAlign: 'center', flex: 1, mb: '$18' }}
                        b
                        h2
                    >
                        Estado de tu orden
                    </Text>
                </Grid>

                <Grid xs={12} css={{ mb: '$18' }}>
                    <Stepper style={{ flex: 1 }} activeStep={orderStatus}>
                        <Step
                            styleConfig={{
                                completedBgColor: '#229954',
                                activeBgColor: '#F1C40F',
                            }}
                            label="Orden recibida"
                        />
                        <Step
                            styleConfig={{
                                completedBgColor: '#229954',
                                activeBgColor: '#F1C40F',
                            }}
                            label="Estamos preparando tu orden"
                        />
                        <Step
                            styleConfig={{
                                completedBgColor: '#229954',
                                activeBgColor: '#F1C40F',
                            }}
                            label="Ya entregamos tu orden ¡disfrutala!"
                        />
                    </Stepper>
                </Grid>
                <Grid.Container>
                    <Lottie
                        style={{ width: 200, height: 200, flex: 1 }}
                        animationData={animation[orderStatus]}
                    />
                </Grid.Container>
            </Grid.Container>
        </div>
    )
}

export default Order
