import { Avatar, Button, Grid, Modal, Text, useModal } from '@nextui-org/react'
import { ProductCard } from 'components/ProductCard'
import { useAppDispatch, useAppSelector } from 'hooks'
import React, { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { deleteProduct, updateProducts } from 'store/slices/order'

export const CartModal: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    const { setVisible, bindings } = useModal()

    const { products, total } = useAppSelector((state) => state.order)
    const dispatch = useAppDispatch()

    const handleUpdateCart = (product, type) => {
        if (type === 'delete') {
            dispatch(deleteProduct({ id: product }))
        } else {
            dispatch(updateProducts({ item: product, type }))
        }
    }

    useEffect(() => {
        setVisible(isVisible)
    }, [isVisible])

    return (
        <>
            <Grid css={{ my: 'auto' }}>
                <Avatar
                    onClick={() => setVisible(true)}
                    css={{ marginLeft: 'auto', top: 10, zIndex: 100 }}
                    size="xs"
                    pointer
                    text={products?.length.toString() || '0'}
                />
                <Avatar
                    css={{ zIndex: 1 }}
                    onClick={() => setVisible(true)}
                    squared
                    pointer
                    icon={<AiOutlineShoppingCart fill="currentColor" />}
                />
            </Grid>
            <Modal
                scroll
                fullScreen
                closeButton
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-table-title" b size={18}>
                        Tu pedido
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Grid.Container gap={2}>
                        {products.map((item) => (
                            <ProductCard
                                type="cart"
                                product={item}
                                onPressInCart={handleUpdateCart}
                                onPress={() => console.log('Hola')}
                            />
                        ))}
                    </Grid.Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={total < 1} color="success" bordered>
                        Realizar pedido
                    </Button>
                    <Text b size="$lg">
                        Total: ${total.toLocaleString('es-CL')}
                    </Text>
                </Modal.Footer>
            </Modal>
        </>
    )
}
