import adminActions from './admin.actions'
import usersActions from './users.action'
import productsActions from './products.actions'
import blogsActions from './blogs.action'
import courseActions from './courses.actions'
import driveActions from './drive.actions'
import callAction from './calls.action'
import contactsActions from './contacts.actions'
import dashboardAction from './dashboard.action'
import supportActions from './support.actions'

const actions = {
    admin:adminActions,
    users:usersActions,
    products:productsActions,
    blogs:blogsActions,
    courses:courseActions,
    drive:driveActions,
    calls: callAction,
    contacts:contactsActions,
    dashboard:dashboardAction,
    support:supportActions
}

export default actions