import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
type Products = Array<{
    id: string
    price: number
    quantity: number
    amount: number
}>
interface InitialState {
    mail: string | undefined
    tableId: number | undefined
    products: Products
    total: number
}

const initialState: InitialState = {
    mail: undefined,
    tableId: undefined,
    products: [],
    total: 0,
}

const updateTotal = (products: Products) => {
    return products.reduce(
        (prev, current) => prev + current.amount * current.quantity,
        0
    )
}

const showToast = (type: 'add' | 'subtract') => {
    toast.success(
        `Producto ${
            type === 'add' ? 'agregado' : 'eliminado'
        } satisfactoriamente.`,
        { position: 'bottom-right' }
    )
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateOrder: (
            state,
            action: PayloadAction<{ key: 'mail' | 'tableId'; value: any }>
        ) => {
            return { ...state, [action?.payload?.key]: action?.payload?.value }
        },
        deleteProduct: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload
            const currentState = current(state)

            const updatedProducts = currentState?.products?.filter(
                (p) => p.id !== id
            )

            state.products = updatedProducts
            state.total = updateTotal(updatedProducts)
        },
        updateProducts: (
            state,
            action: PayloadAction<{
                item: { id: string; price: number; amount: number }
                type: 'add' | 'subtract'
            }>
        ) => {
            const { item, type = 'add' } = action.payload
            const currentState = current(state)

            const productExistInOrder = currentState?.products?.filter(
                (pI) => pI.id == item.id
            )
            let updatedProducts
            if (productExistInOrder?.length > 0) {
                updatedProducts = state.products.map((p) =>
                    p.id === item.id
                        ? {
                              ...p,
                              quantity:
                                  type === 'add'
                                      ? p.quantity + 1
                                      : p.quantity - 1,
                          }
                        : p
                )
            } else {
                updatedProducts = [
                    ...currentState?.products,
                    { ...item, quantity: 1 },
                ]
            }
            showToast(type)
            state.products = updatedProducts.filter((item) => item.quantity > 0)
            state.total = updateTotal(updatedProducts)
        },
    },
})

export const { updateOrder, updateProducts, deleteProduct } = orderSlice.actions
export default orderSlice.reducer
