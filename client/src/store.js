import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {globalReducer} from './reducers'


const reducer = combineReducers(globalReducer) 

const middleware = [thunk] 

const clientLocalStorage = localStorage.getItem('client') 
? JSON.parse(localStorage.getItem('client')) 
:null

const languageLocalStorage = localStorage.getItem('lang')
? localStorage.getItem('lang') : 'en'

const isClientAuth = () => {
    if(clientLocalStorage) {
        const today = new Date()
        const expiryDateLocalStorage = JSON.parse(localStorage.getItem('expiryAt'))
        const expiryDate = new Date(expiryDateLocalStorage)
        if(today < expiryDate) {
            return true
        }
    }
    localStorage.removeItem('client')
    localStorage.removeItem('expiryAt')
    return false
}

const initState = {
    client:{
        isAuth:isClientAuth(), 
        info:clientLocalStorage
    },
    language:{
        lang:languageLocalStorage
    }
}

export const store = createStore(
    reducer, 
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
)