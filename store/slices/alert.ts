import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {},
    reducers: {
        showAlert: (
            state,
            action: PayloadAction<{
                title: string
                text: string
                type: 'success' | 'error' | 'warning' | 'info' | 'question'
                buttons?: {
                    confirmText?: string | undefined
                    cancelText?: string | undefined
                    onConfirm?: () => void
                    onCancel?: () => void
                }
            }>
        ) => {
            Swal.fire({
                title: action.payload.title,
                text: action.payload.text,
                icon: action.payload.type,
                showCancelButton: action.payload.buttons?.cancelText
                    ? true
                    : false,
                confirmButtonText: action.payload.buttons?.confirmText || 'Ok',
                cancelButtonText: action.payload.buttons?.cancelText,
            }).then((result) => {
                if (result.isConfirmed) {
                    action.payload?.buttons?.onConfirm?.()
                } else if (result.isDenied || result.isDismissed) {
                    action.payload?.buttons?.onCancel?.()
                }
            })
        },
    },
})

export const { showAlert } = alertSlice.actions
export default alertSlice.reducer
