import axios from 'axios'

const service = (_) => {
  return axios.create({
    baseURL: '/api/',
    headers: {
      apikey: import.meta.env.VITE_API_KEY,
      lang: 'en',
    },
  })
}

export default service
