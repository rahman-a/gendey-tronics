import service from "./service"


const usersAPI = {
    index(query){
        const queryString = new URLSearchParams(query).toString()
        return service().get(`/users?${queryString}`)
    },
    delete(id) {
        return service().delete(`users/${id}`)
    }
}

export default usersAPI