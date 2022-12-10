import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Navbar, Text, Input, Grid } from '@nextui-org/react'
import { ProductCard } from 'components/ProductCard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { parseInt } from 'lodash'
import { TableModal } from 'components/pedir/TableModal'
import { useAppDispatch, useAppSelector } from 'hooks'
import { updateOrder, updateProducts } from 'store/slices/order'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CartModal } from 'components/pedir/CartModal'
import { getProducts } from 'services/productos'

const bProducts = [
    {
        image: 'https://www.recetasnestle.cl/sites/default/files/srh_recipes/a8c2024ecb72853ba0fb2b45b66a5685.jpg',
        title: 'Porotos con riendas',
        description: 'Ricos porotos hechos con nuestra receta favorita.',
        price: '$5.990',
        id: 1,
        amount: 5990,
    },
    {
        image: 'https://comidaschilenas.com/wp-content/uploads/2022/07/Receta-de-humitas-de-choclo-Comidas-Chilenas.jpg',
        title: 'Humitas',
        description:
            'Deliciosas humitas (4) realizadas con choclos recien sacados de la huerta.',
        price: '$7.990',
        id: 2,
        amount: 7990,
    },
    {
        image: 'https://cocinachilena.cl/wp-content/uploads/2011/02/xpastel-choclo-7-1024x720.jpg.pagespeed.ic_.V4NOdhQRWT.jpg',
        title: 'Pastel de choclo',
        description:
            'Nuestro famoso pastel de choclo con un mix de carne y pollo.',
        price: '$6.990',
        id: 3,
        amount: 6990,
    },
    {
        image: 'https://assets.unileversolutions.com/recipes-v2/232080.jpg',
        title: 'Lasaña a la boloñesa',
        description: 'Deliciosas lasaña con nuestra unica y exquisita receta',
        price: '$8.990',
        id: 4,
        amount: 8990,
    },
]

const Pedir: NextPage = () => {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filterString, setFilterString] = useState('')
    const [showTableModal, setShowTableModal] = useState(false)
    const [showCartModal, setShowCartModal] = useState(false)
    const [bProducts, setProducts] = useState([])

    const router = useRouter()
    const { tableId, mail, products, total } = useAppSelector(
        (state) => state.order
    )
    const dispatch = useAppDispatch()

    const filterProducts = (e) => {
        const filterString = e.target.value
        setFilterString(filterString)
        setFilteredProducts(
            [...bProducts].filter((i) =>
                i.title.toLowerCase().includes(filterString.toLowerCase())
            )
        )
    }

    const handleAddProductToCart = (product) => {
        dispatch(updateProducts({ item: product }))
    }

    useEffect(() => {
        if (router.isReady && !tableId) {
            const tableIdParam = parseInt(
                (router?.query?.slug as string[])?.[0]
            )
            tableIdParam
                ? dispatch(updateOrder({ key: 'tableId', value: tableIdParam }))
                : setShowTableModal(true)
        }
    }, [router.isReady, tableId])

    useEffect(() => {
        const products = async () => {
            try {
                const response = await getProducts()
                console.log('Response data ===>', response.data)
                const arr = response?.data?.map((p) => ({
                    amount: p.precio,
                    image: p.imagen,
                    description: p.descripcion,
                    title: p.nombre,
                    id: p.id_receta,
                    price: `$ ${p.precio.toLocaleString('es-CL')}`,
                    ...p,
                }))
                setProducts(arr)
            } catch (error) {
                console.log('This is the error ==>', error.response)
            }
        }
        products()
    }, [])

    return (
        <div>
            <Head>
                <title>Pedir | Siglo 21</title>
                <meta
                    name="description"
                    content="Pedir | restaurant Siglo 21"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <TableModal show={showTableModal} />
                <Navbar isBordered variant="floating">
                    <Grid.Container>
                        <Grid xs={12} md={6}>
                            <Input
                                onChange={filterProducts}
                                placeholder="Busca platos"
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Text
                                css={{
                                    textAlign: 'right',
                                    flex: 1,
                                    my: 'auto',
                                    mr: '$10',
                                }}
                            >
                                Mesa {tableId}
                            </Text>
                            <CartModal isVisible={showCartModal} />
                        </Grid>
                    </Grid.Container>
                </Navbar>
                {filteredProducts?.length > 0 && filterString && (
                    <>
                        <Grid.Container>
                            <Text h3 css={{ px: '$12', mt: '$4' }}>
                                En base a tu busqueda
                            </Text>
                        </Grid.Container>
                        <Grid.Container css={{ px: '$12' }} gap={2}>
                            {filteredProducts.map((item) => (
                                <ProductCard
                                    onPress={handleAddProductToCart}
                                    product={item}
                                />
                            ))}
                        </Grid.Container>
                    </>
                )}
                <Grid.Container>
                    <Text h3 css={{ px: '$12', mt: '$4' }}>
                        Lo que más le gusta a nuestros clientes
                    </Text>
                </Grid.Container>
                <Grid.Container css={{ px: '$12' }} gap={2}>
                    {bProducts.map((item) => (
                        <ProductCard
                            onPress={handleAddProductToCart}
                            product={item}
                        />
                    ))}
                </Grid.Container>
                <Grid.Container>
                    <Text h3 css={{ px: '$12', mt: '$4' }}>
                        Nuestra carta
                    </Text>
                </Grid.Container>
                <Grid.Container gap={2} css={{ px: '$12' }}>
                    {bProducts.map((item) => (
                        <ProductCard
                            onPress={handleAddProductToCart}
                            product={item}
                        />
                    ))}
                    {bProducts.map((item) => (
                        <ProductCard
                            onPress={handleAddProductToCart}
                            product={item}
                        />
                    ))}
                    {bProducts.map((item) => (
                        <ProductCard
                            onPress={handleAddProductToCart}
                            product={item}
                        />
                    ))}
                    {bProducts.map((item) => (
                        <ProductCard
                            onPress={handleAddProductToCart}
                            product={item}
                        />
                    ))}
                </Grid.Container>
            </div>
        </div>
    )
}

export default Pedir
