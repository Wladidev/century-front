import { combineReducers } from 'redux'
import alert from './slices/alert'
import login from './slices/login'
import order from './slices/order'
import reservation from './slices/reservation'

const rootReducer = combineReducers({
    login,
    alert,
    order,
    reservation,
})

export default rootReducer
