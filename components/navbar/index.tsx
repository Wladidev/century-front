import { useState } from 'react'
import { Grid, Input, Link, Navbar as NavbarComponent } from '@nextui-org/react'

export const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <NavbarComponent isBordered variant="sticky">
            <Grid.Container>
                <Grid xs={12} sm={1}>
                    <Link css={{ textAlign: 'center' }} href="/reservar">
                        Reservar
                    </Link>
                </Grid>
                <Grid xs={12} sm={1}>
                    <Link css={{ textAlign: 'center' }} href="/reservas">
                        Mis reservas
                    </Link>
                </Grid>
                <Grid xs={12} sm={1}>
                    <Link css={{ textAlign: 'center' }} href="/pedir">
                        Ordenar
                    </Link>
                </Grid>
                <Grid xs={12} sm={1}>
                    <Link css={{ textAlign: 'center' }} href="/ordenes">
                        Mis ordenes
                    </Link>
                </Grid>
            </Grid.Container>
        </NavbarComponent>
    )
}
