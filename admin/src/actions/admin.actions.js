import constants from '../constants'
import api from '../api'

const login = (info) => async (dispatch) => {
  dispatch({ type: constants.admin.ADMIN_LOGIN_REQUEST })
  try {
    const { data } = await api.admin.login(info)
    localStorage.setItem('aid', data.id)
    localStorage.setItem('expiryAd', data.expiryAt)
    dispatch({ type: constants.admin.ADMIN_LOGOUT_RESET })
    dispatch({
      type: constants.admin.ADMIN_LOGIN_SUCCESS,
      adminId: data.id,
      isAuth: true,
    })
  } catch (error) {
    dispatch({
      type: constants.admin.ADMIN_LOGIN_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const logout = () => async (dispatch) => {
  dispatch({ type: constants.admin.ADMIN_LOGOUT_REQUEST })
  try {
    await api.admin.logout()
    localStorage.removeItem('aid')
    localStorage.removeItem('expiryAd')
    dispatch({ type: constants.admin.ADMIN_LOGOUT_SUCCESS })
    dispatch({ type: constants.admin.ADMIN_LOGIN_RESET })
  } catch (error) {
    dispatch({
      type: constants.admin.ADMIN_LOGOUT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const sliders = () => async (dispatch) => {
  dispatch({ type: constants.admin.LIST_SLIDERS_REQUEST })
  try {
    const { data } = await api.admin.sliders()
    dispatch({
      type: constants.admin.LIST_SLIDERS_SUCCESS,
      payload: data.sliders,
    })
  } catch (error) {
    dispatch({
      type: constants.admin.LIST_SLIDERS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createSlider = (info) => async (dispatch, getState) => {
  dispatch({ type: constants.admin.CREATE_SLIDER_REQUEST })
  try {
    const { data } = await api.admin.createSlider(info)
    const { sliders } = getState().listSliders
    if (sliders) {
      const copiedSliders = JSON.parse(JSON.stringify(sliders))
      copiedSliders.push(data.slider)
      dispatch({
        type: constants.admin.LIST_SLIDERS_SUCCESS,
        payload: copiedSliders,
      })
    }
    dispatch({
      type: constants.admin.CREATE_SLIDER_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.admin.CREATE_SLIDER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteSlider = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.admin.DELETE_SLIDER_REQUEST })
  try {
    const { data } = await api.admin.deleteSlider(id)
    const { sliders } = getState().listSliders
    if (sliders) {
      let copiedSliders = JSON.parse(JSON.stringify(sliders))
      copiedSliders = copiedSliders.filter((slider) => slider._id !== id)
      dispatch({
        type: constants.admin.LIST_SLIDERS_SUCCESS,
        payload: copiedSliders,
      })
    }
    dispatch({
      type: constants.admin.DELETE_SLIDER_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.admin.DELETE_SLIDER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getAdminInfo = () => async (dispatch) => {
  dispatch({ type: constants.admin.GET_ADMIN_INFO_REQUEST })
  try {
    const { data } = await api.admin.getInfo()
    dispatch({
      type: constants.admin.GET_ADMIN_INFO_SUCCESS,
      payload: data.info,
    })
  } catch (error) {
    dispatch({
      type: constants.admin.GET_ADMIN_INFO_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateAdminInfo = (adminInfo) => async (dispatch, getState) => {
  dispatch({ type: constants.admin.UPDATE_ADMIN_INFO_REQUEST })
  try {
    const { data } = await api.admin.updateInfo(adminInfo)
    const { info } = getState().getAdminInfo
    if (info) {
      const copiedInfo = JSON.parse(JSON.stringify(info))
      for (let key in data.info) {
        copiedInfo[key] = data.info[key]
      }
      dispatch({
        type: constants.admin.GET_ADMIN_INFO_SUCCESS,
        payload: copiedInfo,
      })
    }
    dispatch({
      type: constants.admin.UPDATE_ADMIN_INFO_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.admin.UPDATE_ADMIN_INFO_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateAdminImage = (image) => async (dispatch, getState) => {
  dispatch({ type: constants.admin.UPDATE_ADMIN_IMAGE_REQUEST })
  try {
    const { data } = await api.admin.updateImage(image)
    const { info } = getState().getAdminInfo
    if (info) {
      const copiedInfo = JSON.parse(JSON.stringify(info))
      copiedInfo.image = data.image
      dispatch({
        type: constants.admin.GET_ADMIN_INFO_SUCCESS,
        payload: copiedInfo,
      })
      dispatch({
        type: constants.admin.GET_ADMIN_AVATAR_SUCCESS,
        payload: data.image,
      })
    }
    dispatch({ type: constants.admin.UPDATE_ADMIN_IMAGE_SUCCESS })
  } catch (error) {
    dispatch({
      type: constants.admin.UPDATE_ADMIN_IMAGE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateAdminPassword = (info) => async (dispatch) => {
  dispatch({ type: constants.admin.UPDATE_ADMIN_PASSWORD_REQUEST })
  try {
    const { data } = await api.admin.updatePassword(info)
    dispatch({
      type: constants.admin.UPDATE_ADMIN_PASSWORD_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.admin.UPDATE_ADMIN_PASSWORD_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getAdminAvatar = () => async (dispatch) => {
  dispatch({ type: constants.admin.GET_ADMIN_AVATAR_REQUEST })
  try {
    const { data } = await api.admin.avatar()
    dispatch({
      type: constants.admin.GET_ADMIN_AVATAR_SUCCESS,
      payload: data.avatar,
    })
  } catch (error) {
    dispatch({
      type: constants.admin.GET_ADMIN_AVATAR_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const actions = {
  login,
  logout,
  sliders,
  createSlider,
  deleteSlider,
  getAdminInfo,
  updateAdminInfo,
  updateAdminImage,
  updateAdminPassword,
  getAdminAvatar,
}

export default actions
