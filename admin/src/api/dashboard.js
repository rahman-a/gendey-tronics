import service from "./service";


const dashboardAPI = {
    info(){
        return service().get('dashboard/info')
    },
    users(){
        return service().get('dashboard/users')
    },
    orders(){
        return service().get('dashboard/orders')
    },
    enrollments(){
        return service().get('dashboard/enrollments')
    },
    contacts(){
        return service().get('dashboard/contacts')
    }
}

export default dashboardAPI