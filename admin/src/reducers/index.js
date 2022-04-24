import adminReducers from './admin.reducers'
import usersReducers from './users.reducers'
import productsReducer from './products.reducers'
import blogsReducer from './blogs.reducer'
import courseReducer from './courses.reducers'
import driveReducer from './drive.reducer'
import callReducer from './calls.reducer'
import contactReducer from './contacts.reducer'
import dashboardReducer from './dashboard.reducer'
import supportReducer from './support.reducer'
import menuReducer from './menu.reducer'
import mediaReducer from './media.reducer'
import instructorReducer from './instructor.reducer'

export const globalReducer = {
  ...adminReducers,
  ...usersReducers,
  ...productsReducer,
  ...blogsReducer,
  ...courseReducer,
  ...driveReducer,
  ...callReducer,
  ...contactReducer,
  ...dashboardReducer,
  ...supportReducer,
  ...menuReducer,
  ...mediaReducer,
  ...instructorReducer,
}
