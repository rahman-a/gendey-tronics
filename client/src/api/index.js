import { clientApi } from "./clientAPI"
import {courseApi} from "./courseAPI"
import {blogApi} from './blogAPI'
import {productApi} from './productAPI'
import {contactAPI} from './contactAPI'

const api = {
    client:clientApi,
    courses:courseApi,
    blogs:blogApi,
    products:productApi,
    contact:contactAPI
}

export default api