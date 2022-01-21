import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {globalReducer} from './reducers'

const middlewares = [thunk]

const reducer = combineReducers(globalReducer)

const admin = localStorage.getItem('adminId')
? JSON.parse(localStorage.getItem('adminId'))
: null

const isAdminAuth = () => {
    if(admin) {
        const today = new Date()
        const expiryDateLocalStorage = JSON.parse(localStorage.getItem('expiryAt'))
        const expiryDate = new Date(expiryDateLocalStorage)
        if(today < expiryDate) {
            return true
        }
    }
    localStorage.removeItem('admin')
    localStorage.removeItem('expiryAt')
    return true // FOR TEST
}

const initState = {
    login:{isAuth:isAdminAuth()},
}

const store = createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middlewares))
)

export default store

