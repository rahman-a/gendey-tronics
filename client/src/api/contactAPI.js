import { service } from './service'

export const contactAPI = {
    send(data){
        return service().post('contacts/new', data)
    }
}