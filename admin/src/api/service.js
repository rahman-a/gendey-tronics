import axios from 'axios'

const service = (_) => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      apikey: import.meta.env.VITE_API_KEY,
      lang: 'en',
    },
    withCredentials: true,
  })
}

export default service
