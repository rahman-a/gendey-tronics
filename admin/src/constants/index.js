import admin from './admin.constants'
import users from './users.constants'
import products from './products.constants'
import blogs from './blogs.constants'
import courses from './courses.constants'
import drive from './drive.constants'
import calls from './calls.constants'
import contacts from './contact.constants'
import dashboard from './dashboard.constants'
import support from './support.constants'
import menu from './menu.constants'
import media from './media.constants'
import instructor from './instructor.constants'

const constants = {
  admin,
  users,
  products,
  blogs,
  courses,
  drive,
  calls,
  contacts,
  dashboard,
  support,
  menu,
  media,
  instructor,
}

export default constants

export const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : 'https://api.gendyecu.com/api'

export const CLIENT_WEBSITE =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5173'
    : 'https://www.gendyecu.com'
