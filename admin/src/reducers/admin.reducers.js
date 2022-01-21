import constants from "../constants"


const login = (state, action) => {
    switch(action.type) {
        case constants.admin.ADMIN_LOGIN_REQUEST: 
            return {loading:true, error:null}
        case constants.admin.ADMIN_LOGIN_SUCCESS: 
            return {loading:false, error:null, isAuth:true} 
        case constants.admin.ADMIN_LOGIN_FAIL: 
            return {loading: false, error:action.payload} 
        case constants.admin.ADMIN_LOGIN_RESET: 
            return {loading:false, error:null, isAuth:false} 
        default:
            return {...state}
    }
}

const admin = {
    login
}

export default admin