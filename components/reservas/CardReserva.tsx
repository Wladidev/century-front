import { Card, Grid, Text, Button, Row } from '@nextui-org/react'

export default function CardReserva({ reservation, onPressDelete }) {
    const { date, time, table } = reservation
    const formatedDate = new Date(date)

    return (
        <Grid css={{ mb: '$12' }} xs={12} md={4}>
            <Card css={{ mw: '330px' }}>
                <Card.Header>
                    <Text b>Reserva</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: '$10' }}>
                    <Grid.Container>
                        <Grid xs={6}>Fecha</Grid>
                        <Grid xs={6}>
                            {new Date(date).toISOString().split('T')[0]}
                        </Grid>
                        <Grid xs={6}>Hora</Grid>
                        <Grid xs={6}>{time}</Grid>
                        <Grid xs={6}>Tu mesa</Grid>
                        <Grid xs={6}>{table}</Grid>
                    </Grid.Container>
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                    <Row justify="flex-end">
                        <Button
                            onPress={() => onPressDelete(reservation)}
                            size="sm"
                            color="error"
                        >
                            Cancelar reserva
                        </Button>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
