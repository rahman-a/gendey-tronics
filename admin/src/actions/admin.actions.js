import constants from "../constants";
import api from '../api'


const login = (info) => async(dispatch) => {
    dispatch({type:constants.admin.ADMIN_LOGIN_REQUEST}) 
    try {
        const {data} = await api.admin.login(info)
        localStorage.setItem('aid', data.id)
        localStorage.setItem('expiryAd', data.expiryAt)
        dispatch({type:constants.admin.ADMIN_LOGIN_SUCCESS, adminId:data.id, isAuth:true})
    } catch (error) {
        dispatch({
            type:constants.admin.ADMIN_LOGIN_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const logout = () => async (dispatch) => {
    dispatch({type:constants.admin.ADMIN_LOGOUT_REQUEST}) 
    try {
        await api.admin.logout()
        localStorage.removeItem('aid')
        localStorage.removeItem('expiryAd')
        dispatch({type:constants.admin.ADMIN_LOGOUT_SUCCESS})
        dispatch({type:constants.admin.ADMIN_LOGIN_RESET})
    } catch (error) {
        dispatch({
            type:constants.admin.ADMIN_LOGOUT_FAIL,
            payload:error.response && error.response.data.message
        })
    }
} 

const actions = {
    login, 
    logout
}

export default actions