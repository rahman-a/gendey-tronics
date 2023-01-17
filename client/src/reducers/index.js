import clientReducers from './clientReducer'
import courseReducers from './courseReducer'
import blogReducer from './blogReducer'
import productReducer from './productReducer'
import contactReducer from './contactReducer'
import contentReducer from './contentReducer'

export const globalReducer = {
  ...clientReducers,
  ...courseReducers,
  ...blogReducer,
  ...productReducer,
  ...contactReducer,
  ...contentReducer,
  language: (state, action) => {
    if (action.type === 'CHANGE_LANGUAGE') {
      localStorage.setItem('lang', action.payload)
      return { lang: action.payload }
    } else {
      return { ...state }
    }
  },
}
