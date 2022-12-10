import { Button, Dropdown, Grid, Input, Modal, Text } from '@nextui-org/react'
import { useAppDispatch } from 'hooks'
import { isInteger, isNumber } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { updateOrder } from 'store/slices/order'

const mesas = [
    {
        key: 1,
        title: 'Mesa 1',
    },
    {
        key: 2,
        title: 'Mesa 2',
    },
    {
        key: 3,
        title: 'Mesa 3',
    },
    {
        key: 4,
        title: 'Mesa 4',
    },
    {
        key: 5,
        title: 'Mesa 5',
    },
    {
        key: 6,
        title: 'Mesa 6',
    },
]

export const TableModal: React.FC<{
    show: boolean
    type: 'table' | 'reservation'
    onContinue: (mail: string) => void
}> = ({ show, type = 'table', onContinue = () => {} }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [selected, setSelected] = useState(
        new Set(['Selecciona tu mesa aquí'])
    )
    const [mail, setMail] = useState('')

    const selectedValue = useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected]
    )

    const [config, setConfig] = useState({
        tableId: undefined,
        tableName: undefined,
        mail: undefined,
    })

    const validateEmail = (mail: string) => {
        return String(mail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const dispatch = useAppDispatch()

    const handleContinue = () => {
        if (type === 'table') {
            dispatch(updateOrder({ key: 'tableId', value: selectedValue }))
            dispatch(updateOrder({ key: 'mail', value: config.mail }))
            setIsVisible(false)
        } else {
            onContinue(mail)
        }
    }

    useEffect(() => {
        setIsVisible(show)
    }, [show])

    const disabled =
        type === 'table'
            ? !parseInt(selectedValue) || !validateEmail(mail)
            : !validateEmail(mail)
    return (
        <Modal
            blur
            preventClose
            aria-labelledby="modal-table"
            open={isVisible}
            scroll
        >
            {type === 'table' ? (
                <>
                    <Modal.Header>
                        <Text id="modal-table-title" size={18}>
                            ¿En que mesa quieres{' '}
                            <Text b size={18}>
                                pedir
                            </Text>
                            ?
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text>¿Cúal es tu mesa?</Text>
                        <Dropdown>
                            <Dropdown.Trigger>{selectedValue}</Dropdown.Trigger>
                            <Dropdown.Menu
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                onSelectionChange={setSelected}
                                aria-label="mesas"
                            >
                                {mesas.map((mesa) => (
                                    <Dropdown.Item key={mesa.key}>
                                        {mesa.title}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Input
                            onChange={(e) => setMail(e.target.value)}
                            css={{ mt: '$12' }}
                            labelPlaceholder="Ingresa tu correo"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={handleContinue}
                            disabled={disabled}
                            color="success"
                        >
                            Continuar con mi pedido
                        </Button>
                    </Modal.Footer>
                </>
            ) : (
                <>
                    <Modal.Header>
                        <Grid.Container>
                            <Grid xs={12}>
                                <Text id="modal-table-title" size={18}>
                                    Ingresa tu{' '}
                                    <Text b size={18}>
                                        correo
                                    </Text>
                                </Text>
                            </Grid>
                            <Grid xs={12}>
                                <Input
                                    onChange={(e) => setMail(e.target.value)}
                                    css={{ mt: '$12' }}
                                />
                            </Grid>
                        </Grid.Container>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button
                            onClick={handleContinue}
                            disabled={disabled}
                            color="success"
                        >
                            Hacer mi reserva
                        </Button>
                    </Modal.Footer>
                </>
            )}
        </Modal>
    )
}
