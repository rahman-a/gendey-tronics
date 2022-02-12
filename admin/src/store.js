import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {globalReducer} from './reducers'

const middlewares = [thunk]

const reducer = combineReducers(globalReducer)

const admin = localStorage.getItem('aid')
? localStorage.getItem('aid')
: null

const isAdminAuth = () => {
    if(admin) {
        const today = new Date()
        const expiryDateLocalStorage = JSON.parse(localStorage.getItem('expiryAd'))
        const expiryDate = new Date(expiryDateLocalStorage)
        if(today < expiryDate) {
            return true
        }
    }
    localStorage.removeItem('aid')
    localStorage.removeItem('expiryAd')
    return false
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

