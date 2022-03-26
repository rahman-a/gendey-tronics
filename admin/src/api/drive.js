import service from './service'


const driveAPI = {
    authenticate() {        
        return service().post(`drive/authenticate`)
    },
    accessToken(code){
        return service().post(`drive/accessToken?code=${code}`)
    },
    deleteFile(id) {
        return service().delete(`drive/delete/${id}`)
    },
    downloadFile(id) {
        return service().get(`drive/download/${id}`)
    },
    deletePermission(id) {
        return service().delete(`drive/permission/${id}`)
    },
    uploadFile(data) {
        return service().post('drive/upload', data)
    },
    resume(data) {
        return service().patch('drive/resume', data)
    },
    search(query) {
        const queryObject = {}
        for(let key in query) {
            if(query[key]) {
                queryObject[key] = query[key]
            }
        }
        const queryString = new URLSearchParams(queryObject).toString()
        return service().get(`drive/search?${queryString}`)
    }
}

export default driveAPI