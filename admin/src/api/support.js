import service from './service'


const supportAPI = {
    index(query) {
        console.log({query});
       const url = query 
        ? `/support${query}`
        : '/support'
        return service().get(url)
    },
    getOne(id){
        return service().get(`support/${id}`)
    },
    send(data){
        return service().post('support/outgoing', data)
    },
    update(id, data) {
        return service().patch(`support/${id}`, data)
    },
    delete(id){
        return service().delete(`support/${id}`)
    }
}

export default supportAPI