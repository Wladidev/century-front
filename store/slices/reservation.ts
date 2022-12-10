import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

export interface IReservation {
    mail: string
    persons: number
    date: Date
    table: number
}

interface InitialState {
    reservations: Array<IReservation>
}
const initialState: InitialState = {
    reservations: [],
}

export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        addReservation: (
            state,
            action: PayloadAction<{ reservation: IReservation }>
        ) => {
            const currentState = current(state)
            const reser = currentState.reservations
            state.reservations = [...reser, action.payload.reservation]
        },
        deleteReservation: (
            state,
            action: PayloadAction<{ date: Date | string }>
        ) => {
            const { date } = action.payload
            const currentState = current(state)
            state.reservations = currentState.reservations.filter(
                (reservation) => reservation.date !== date
            )
        },
    },
})

export const { addReservation, deleteReservation } = reservationSlice.actions
export default reservationSlice.reducer
