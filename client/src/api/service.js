import axios from 'axios'
import { API_URL } from '../constants'

export const service = (_) => {
  const lang = localStorage.getItem('lang')
    ? localStorage.getItem('lang')
    : 'en'
  return axios.create({
    baseURL: API_URL,
    headers: {
      apikey: import.meta.env.VITE_API_KEY,
      lang,
    },
    withCredentials: true,
  })
}
