import { Button, Card, Col, Grid, Row, Text } from '@nextui-org/react'
import React from 'react'
import { AiOutlineLine, AiOutlinePlus } from 'react-icons/ai'
import { BsFillTrash2Fill } from 'react-icons/bs'

interface Product {
    title: string
    description: string
    price: number
    image: string
    id: string
    quantity?: number
}

export const ProductCard: React.FC<{
    product: Product
    type?: 'cart' | 'normal'
    onPressInCart?: (
        product: Product,
        type: 'add' | 'subtract' | 'delete'
    ) => void
    onPress: (product: Product) => void
}> = ({ product, onPress, type = 'normal', onPressInCart }) => {
    const { title, description, price, image } = product

    const size = type === 'normal' ? 3 : 6
    return (
        <Grid xs={12} md={size} sm={size}>
            <Card onPress={() => onPress(product)} isPressable>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        src={image}
                        objectFit="cover"
                        width="100%"
                        height={140}
                        alt={title}
                    />
                </Card.Body>
                <Card.Footer
                    css={{
                        justifyItems: 'flex-start',
                        flexDirection: 'column',
                    }}
                >
                    <Row wrap="wrap" justify="space-between" align="center">
                        <Text b>{title}</Text>
                        <Text
                            css={{
                                color: '$accents7',
                                fontWeight: '$semibold',
                                fontSize: '$sm',
                            }}
                        >
                            {price}
                        </Text>
                    </Row>
                    <Row>
                        <Text>{description}</Text>
                    </Row>
                    {type === 'cart' && (
                        <Grid.Container
                            css={{
                                mt: '$7',
                            }}
                        >
                            <Grid css={{ padding: 0 }} xs={12} sm={10}>
                                <Button
                                    bordered
                                    color="error"
                                    size="xs"
                                    onClick={() =>
                                        onPressInCart?.(product, 'subtract')
                                    }
                                    icon={<AiOutlineLine />}
                                />

                                <Text css={{ px: '$12', my: 'auto' }}>
                                    {product.quantity}
                                </Text>
                                <Button
                                    size="xs"
                                    color="success"
                                    onClick={() =>
                                        onPressInCart?.(product, 'add')
                                    }
                                    bordered
                                    icon={<AiOutlinePlus />}
                                />
                            </Grid>
                            <Grid css={{ padding: 0 }} xs={12} sm={2}>
                                <Button
                                    bordered
                                    color="error"
                                    size="xs"
                                    onClick={() =>
                                        onPressInCart?.(product.id, 'delete')
                                    }
                                    icon={<BsFillTrash2Fill />}
                                />
                            </Grid>
                        </Grid.Container>
                    )}
                </Card.Footer>
            </Card>
        </Grid>
    )
}
