import adminAPI from "./admin"
import usersAPI from "./users"
import productsAPI from "./products"
import blogsAPI from "./blogs"
import courseAPI from "./courses"
import driveAPI from './drive'
import callAPI from "./calls"
import contactsAPI from './contacts'
import dashboardAPI from "./dashboard"

const api = {
    admin:adminAPI,
    users:usersAPI,
    products:productsAPI,
    blogs:blogsAPI,
    courses:courseAPI,
    drive:driveAPI,
    calls: callAPI,
    contacts:contactsAPI,
    dashboard:dashboardAPI
}

export default api