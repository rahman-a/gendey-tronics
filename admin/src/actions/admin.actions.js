import constants from "../constants";
import api from '../api'


const login = (info) => async(dispatch) => {
    dispatch({type:constants.admin.ADMIN_LOGIN_REQUEST}) 
    try {
        const {data} = await api.admin.login(info)
        localStorage.setItem('aid', data.id)
        localStorage.setItem('expiryAd', data.expiryAt)
        dispatch({type:constants.admin.ADMIN_LOGOUT_RESET})
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

const sliders = () => async (dispatch) => {
    dispatch({type:constants.admin.LIST_SLIDERS_REQUEST}) 
    try {
        const {data} = await api.admin.sliders()
        dispatch({type:constants.admin.LIST_SLIDERS_SUCCESS, payload:data.sliders})
    } catch (error) {
        dispatch({
            type:constants.admin.LIST_SLIDERS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
} 

const createSlider = (info) => async (dispatch, getState) => {
    dispatch({type:constants.admin.CREATE_SLIDER_REQUEST}) 
    try {
        const {data} = await api.admin.createSlider(info)
        const {sliders} = getState().listSliders 
        if(sliders) {
            const copiedSliders = JSON.parse(JSON.stringify(sliders))
            copiedSliders.push(data.slider)
            dispatch({type:constants.admin.LIST_SLIDERS_SUCCESS, payload:copiedSliders})
        }
        dispatch({type:constants.admin.CREATE_SLIDER_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.admin.CREATE_SLIDER_FAIL,
            payload:error.response && error.response.data.message
        })
    }
} 

const deleteSlider = (id) => async (dispatch, getState) => {
    dispatch({type:constants.admin.DELETE_SLIDER_REQUEST}) 
    try {
        const {data} = await api.admin.deleteSlider(id)
        const {sliders} = getState().listSliders 
        if(sliders) {
            let copiedSliders = JSON.parse(JSON.stringify(sliders))
            copiedSliders = copiedSliders.filter(slider => slider._id !== id)
            dispatch({type:constants.admin.LIST_SLIDERS_SUCCESS, payload:copiedSliders})
        }
        dispatch({type:constants.admin.DELETE_SLIDER_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.admin.DELETE_SLIDER_FAIL,
            payload:error.response && error.response.data.message
        })
    }
} 

const actions = {
    login, 
    logout,
    sliders,
    createSlider,
    deleteSlider
}

export default actions