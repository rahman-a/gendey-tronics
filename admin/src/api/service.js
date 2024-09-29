import axios from 'axios'
import { API_URL } from '../constants'

const service = (_) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      apikey: import.meta.env.VITE_API_KEY,
      lang: 'en',
    },
    withCredentials: true,
  })
}

export default service
