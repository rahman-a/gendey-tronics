import service from "./service";

const adminAPI = {
    login(data) {
        return service().post('users/login/admin', data)
    },
    logout(){
        return service().post('users/logout/admin')
    }
}

export default adminAPI