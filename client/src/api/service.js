import axios from 'axios'

export const service = _ => {
    const lang = localStorage.getItem('lang') 
    ? localStorage.getItem('lang') : 'en'
    return axios.create({
        baseURL:'/api/',
        headers:{
            apikey:process.env.REACT_APP_API_KEY,
            lang
        }
    })
}
