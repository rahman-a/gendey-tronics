import constants from "../constants"


const login = (state, action) => {
    switch(action.type) {
        case constants.admin.ADMIN_LOGIN_REQUEST: 
            return {loading:true, error:null}
        case constants.admin.ADMIN_LOGIN_SUCCESS: 
            return {loading:false, error:null, adminId:action.payload, isAuth:true} 
        case constants.admin.ADMIN_LOGIN_FAIL: 
            return {loading: false, error:action.payload} 
        case constants.admin.ADMIN_LOGIN_RESET: 
            return {loading:false, error:null, adminId:null,  isAuth:false} 
        default:
            return {...state}
    }
}

const logout = (state, action) => {
    switch(action.type) {
        case constants.admin.ADMIN_LOGOUT_REQUEST: 
            return {loading:true, error:null} 
        case constants.admin.ADMIN_LOGOUT_SUCCESS: 
            return {loading:false, error:null, isLogout:true} 
        case constants.admin.ADMIN_LOGOUT_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.admin.ADMIN_LOGOUT_RESET: 
            return {loading:false, error:null, isLogout:false} 
        default:
            return {...state}
    }
}

const admin = {
    login,
    logout
}

export default admin