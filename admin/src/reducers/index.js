import adminReducers from './admin.reducers'
import usersReducers from './users.reducers'
import productsReducer from './products.reducers'
import blogsReducer from './blogs.reducer'

export const globalReducer = {
    ...adminReducers,
    ...usersReducers,
    ...productsReducer,
    ...blogsReducer
}