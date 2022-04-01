import constants from '../constants'
import api from '../api'

const clientRegister = (info) => async (dispatch) => {
    dispatch({type:constants.client.REGISTER_REQUEST}) 
    try {
        const {data} = await api.client.register(info)
        dispatch({type:constants.client.REGISTER_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.client.REGISTER_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

const clientLogin = (info) => async(dispatch) => {
    dispatch({type:constants.client.LOGIN_REQUEST})
    try {
        const {data} = await api.client.login(info)
        localStorage.setItem('client', JSON.stringify(data.user))
        localStorage.setItem('expiryAt', data.expiryAt)
        dispatch({type:constants.client.LOGIN_SUCCESS, payload:{
            info:data.user,
            isAuth:true
        }})
    } catch (error) {
        dispatch({
            type:constants.client.LOGIN_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const clientGoogleSignIn = (token) => async(dispatch) => {
    dispatch({type:constants.client.GOOGLE_SIGN_IN_REQUEST})
    try {
        const {data} = await api.client.googleSignIn(token)
        localStorage.setItem('client', JSON.stringify(data.user))
        localStorage.setItem('expiryAt', data.expiryAt)
        dispatch({type:constants.client.GOOGLE_SIGN_IN_SUCCESS, payload:data.success})
        dispatch({type:constants.client.LOGIN_SUCCESS, payload:{
            info:data.user,
            isAuth:true
        }})
    } catch (error) {
        dispatch({
            type:constants.client.GOOGLE_SIGN_IN_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const clientFacebookSignIn = (token) => async(dispatch) => {
    dispatch({type:constants.client.FACEBOOK_SIGN_IN_REQUEST})
    try {
        const {data} = await api.client.facebookSignIn(token)
        localStorage.setItem('client', JSON.stringify(data.user))
        localStorage.setItem('expiryAt', data.expiryAt)
        dispatch({type:constants.client.FACEBOOK_SIGN_IN_SUCCESS, payload:data.success})
        dispatch({type:constants.client.LOGIN_SUCCESS, payload:{
            info:data.user,
            isAuth:true
        }})
    } catch (error) {
        dispatch({
            type:constants.client.FACEBOOK_SIGN_IN_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const clientLogout = () => async (dispatch) => {
    dispatch({type: constants.client.LOGOUT_REQUEST})
    try {
        const {data} = await api.client.logout()
        localStorage.removeItem('client')
        localStorage.removeItem('expiryAt')
        dispatch({type: constants.client.LOGOUT_SUCCESS, payload:data.success})
        dispatch({type: constants.client.LOGIN_CLEAR})
    } catch (error) {
        dispatch({
            type:constants.client.LOGIN_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}


const clientUpdate = (info) => async (dispatch) => {
    dispatch({type: constants.client.UPDATE_REQUEST})
    try {
        const {data} = await api.client.update(info)
        localStorage.setItem('client', JSON.stringify(data.user))
        dispatch({type:constants.client.LOGIN_SUCCESS, payload:{
            info:data.user,
            isAuth:true
        }})
        dispatch({type: constants.client.UPDATE_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.client.UPDATE_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const clientUpdatePass = (info) => async (dispatch) => {
    dispatch({type: constants.client.UPDATE_PASSWORD_REQUEST})
    try {
        const {data} = await api.client.updatePass(info)
        dispatch({type: constants.client.UPDATE_PASSWORD_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.client.UPDATE_PASSWORD_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const clientVerifyEmail = (info) => async (dispatch) => {
    dispatch({type: constants.client.VERIFY_EMAIL_REQUEST})
    try {
        const {data} = await api.client.verifyEmail(info)
        dispatch({type: constants.client.VERIFY_EMAIL_SUCCESS, payload:data.success})
    } catch (error) {
        dispatch({
            type:constants.client.VERIFY_EMAIL_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const clientResetPass = (info) => async (dispatch) => {
    dispatch({type: constants.client.RESET_PASSWORD_REQUEST})
    try {
        const {data} = await api.client.resetPass(info)
        dispatch({type: constants.client.RESET_PASSWORD_SUCCESS, payload:data.success})
    } catch (error) {
        dispatch({
            type:constants.client.RESET_PASSWORD_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const sendResetLink = (info) => async (dispatch) => {
    dispatch({type: constants.client.RESET_PASSWORD_LINK_REQUEST})
    try {
        const {data} = await api.client.sendResetLink(info)
        dispatch({type: constants.client.RESET_PASSWORD_LINK_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.client.RESET_PASSWORD_LINK_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const downloadLinks = _ => async (dispatch) => {
    dispatch({type:constants.client.DOWNLOAD_LINKS_REQUEST}) 
    try {
        const {data} = await api.client.links()
        dispatch({type:constants.client.DOWNLOAD_LINKS_SUCCESS, payload:data.links})
    } catch (error) {
        dispatch({
            type:constants.client.DOWNLOAD_LINKS_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

const clientSearch = keyword => async (dispatch) => {
    dispatch({type:constants.client.USER_SEARCH_REQUEST}) 
    try {
        const {data} = await api.client.search(keyword)
        dispatch({type:constants.client.USER_SEARCH_SUCCESS, payload:data.result})
    } catch (error) {
        dispatch({
            type:constants.client.USER_SEARCH_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

const pageSliders = _ => async (dispatch) => {
    dispatch({type:constants.client.PAGE_SLIDERS_REQUEST}) 
    try {
        const {data} = await api.client.sliders()
        dispatch({type:constants.client.PAGE_SLIDERS_SUCCESS, payload:data.sliders})
    } catch (error) {
        dispatch({
            type:constants.client.PAGE_SLIDERS_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

const clientActions = {
    register:clientRegister,
    login:clientLogin,
    logout:clientLogout,
    update:clientUpdate,
    updatePass:clientUpdatePass,
    verifyEmail:clientVerifyEmail,
    resetPass:clientResetPass,
    resetLink:sendResetLink,
    googleSignIn:clientGoogleSignIn,
    facebookSignIn:clientFacebookSignIn,
    downloadLinks,
    clientSearch,
    pageSliders
}

export default clientActions

