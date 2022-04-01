import service from "./service";

const adminAPI = {
    login(data) {
        return service().post('users/login/admin', data)
    },
    logout(){
        return service().post('users/logout/admin')
    },
    sliders(){
        return service().get('sliders')
    },
    createSlider(data){
        return service().post('sliders/add', data)
    },
    deleteSlider(id){
        return service().delete(`sliders/${id}`)
    }
}

export default adminAPI