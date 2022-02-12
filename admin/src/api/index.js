import adminAPI from "./admin"
import usersAPI from "./users"
import productsAPI from "./products"
import blogsAPI from "./blogs"


const api = {
    admin:adminAPI,
    users:usersAPI,
    products:productsAPI,
    blogs:blogsAPI
}

export default api