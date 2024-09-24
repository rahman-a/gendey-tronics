import axios from 'axios'

export const service = (_) => {
  const lang = localStorage.getItem('lang')
    ? localStorage.getItem('lang')
    : 'en'
  return axios.create({
    baseURL: '/api',
    headers: {
      apikey: import.meta.env.VITE_API_KEY,
      lang,
    },
  })
}
