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

const listSliders = (state, action) => {
    switch(action.type) {
        case constants.admin.LIST_SLIDERS_REQUEST: 
            return {loading:true, error:null}
        case constants.admin.LIST_SLIDERS_SUCCESS: 
            return {loading:false, error:null, sliders:action.payload} 
        case constants.admin.LIST_SLIDERS_FAIL: 
            return {loading: false, error:action.payload} 
        case constants.admin.LIST_SLIDERS_RESET: 
            return {loading:false, error:null, sliders:null} 
        default:
            return {...state}
    }
}

const deleteSlider = (state, action) => {
    switch(action.type) {
        case constants.admin.DELETE_SLIDER_REQUEST: 
            return {loading:true, error:null}
        case constants.admin.DELETE_SLIDER_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.admin.DELETE_SLIDER_FAIL: 
            return {loading: false, error:action.payload} 
        case constants.admin.DELETE_SLIDER_RESET: 
            return {loading:false, error:null, message:null} 
        default:
            return {...state}
    }
}

const createSlider = (state, action) => {
    switch(action.type) {
        case constants.admin.CREATE_SLIDER_REQUEST: 
            return {loading:true, error:null}
        case constants.admin.CREATE_SLIDER_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.admin.CREATE_SLIDER_FAIL: 
            return {loading: false, error:action.payload} 
        case constants.admin.CREATE_SLIDER_RESET: 
            return {loading:false, error:null, message:null} 
        default:
            return {...state}
    }
}

const admin = {
    login,
    logout,
    listSliders,
    deleteSlider,
    createSlider
}

export default admin