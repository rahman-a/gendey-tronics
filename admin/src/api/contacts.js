import service from './service'

const callAPI = {
    index(query) {
        const queryObject = {}
        for(let key in query) {
            if(query[key]) {
                queryObject[key] = query[key]
            }
        }
        const queryString = new URLSearchParams(queryObject).toString()
        return service().get(`contacts?${queryString}`)
    },
    latest() {
        return service().get('contacts/latest') 
    },
    toggle(id) {
        return service().patch(`contacts/${id}`)
    },
    delete(id) {
        return service().delete(`contacts/${id}`)
    }
}

export default callAPI