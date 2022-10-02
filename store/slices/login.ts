import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginService } from 'services/LoginService'

interface LoginData {
    mail: string
    password: string
}

const handleLoginUser = createAsyncThunk(
    'users/login',
    async (data: LoginData, thunkAPI) => {
        const response = await LoginService({
            mail: data.mail,
            password: data.password,
        })
        return response
    }
)

const initialState = {
    isLogged: false,
    userData: {
        firstName: '',
        lastName: '',
        roles: [],
        mail: '',
    },
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        handleLogout: () => {
            return { ...initialState }
        },
    },
    extraReducers(builder) {
        builder.addCase(handleLoginUser.fulfilled, (state, action) => {
            const userData = { ...action.payload }
            delete userData.ok
            return { isLogged: true, userData }
        })
        builder.addCase(handleLoginUser.rejected, () => {
            return { ...initialState }
        })
    },
})

export const { handleLogout } = loginSlice.actions

export { handleLoginUser }
export default loginSlice.reducer
