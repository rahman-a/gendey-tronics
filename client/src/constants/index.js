import client from './clientConstant'
import courses from './courseConstant'
import blogs from './blogConstant'
import product from './productConstant'
import contact from './contactConstant'
import content from './contentConstant'

const constants = {
  client,
  courses,
  blogs,
  product,
  contact,
  content,
}

export default constants

export const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : 'https://api.gendyecu.com/api'
export const ADMIN_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000'
    : 'https://admin.gendyecu.com'

////////// For Test ///////////////////
// export const API_URL = 'http://localhost:5000/api'
// export const ADMIN_URL = 'http://localhost:3000'
