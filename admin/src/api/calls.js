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
        return service().get(`calls?${queryString}`)
    },
    latest() {
        return service().get('calls/latest') 
    },
    toggle(id) {
        return service().patch(`calls/${id}`)
    },
    delete(id) {
        return service().delete(`calls/${id}`)
    }
}

export default callAPI