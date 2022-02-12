import service from './service'


const productsAPI = {
    index(query) {
        const queryObject = {}
        for(let key in query) {
            if(query[key]) {
                queryObject[key] = query[key]
            }
        }
        const queryString = new URLSearchParams(queryObject).toString()
        return service().get(`products?${queryString}`)
    },
    getOne(id){
        return service().get(`products/${id}`)
    },
    create(data){
        return service().post('products/new', data)
    },
    update(id, data) {
        return service().patch(`products/${id}`, data)
    },
    updateImage(id, data){
        return service().patch(`products/image/${id}`, data)
    },
    delete(id){
        return service().delete(`products/${id}`)
    },
    orders(query){
        const queryString = new URLSearchParams(query).toString() 
        return service().get(`orders/all?${queryString}`)
    },
    getOrder(id) {
        return service().get(`orders/${id}`)
    }
}

export default productsAPI