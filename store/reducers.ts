import { combineReducers } from 'redux'
import alert from './slices/alert'
import login from './slices/login'

const rootReducer = combineReducers({
    login: login,
    alert: alert,
})

export default rootReducer
