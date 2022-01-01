import clientReducers from './clientReducer'
import courseReducers from './courseReducer'
import blogReducer from './blogReducer'
import productReducer from './productReducer'
import contactReducer from './contactReducer'

export const globalReducer = {
    ...clientReducers,
    ...courseReducers,
    ...blogReducer,
    ...productReducer,
    ...contactReducer,
    language:(state, action) => {
        if(action.type === 'CHANGE_LANGUAGE'){
            localStorage.setItem('lang', action.payload)
            return {lang:action.payload}
        }else {return {...state}}
    }
}