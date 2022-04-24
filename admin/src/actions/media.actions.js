import constants from '../constants'
import api from '../api'

const listMedia = (query) => async (dispatch) => {
  dispatch({ type: constants.media.LIST_MEDIA_REQUEST })
  try {
    const { data } = await api.media.listMedia(query)
    dispatch({ type: constants.media.LIST_MEDIA_SUCCESS, payload: data.media })
  } catch (error) {
    dispatch({
      type: constants.media.LIST_MEDIA_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createMedia = (info) => async (dispatch, getState) => {
  dispatch({ type: constants.media.CREATE_MEDIA_REQUEST })
  try {
    const { data } = await api.media.createMedia(info)
    const { media } = getState().listMedia
    if (media) {
      const copiedMedia = [...media]
      copiedMedia.push(data.media)
      dispatch({
        type: constants.media.LIST_MEDIA_SUCCESS,
        payload: copiedMedia,
      })
    }
    dispatch({
      type: constants.media.CREATE_MEDIA_SUCCESS,
      payload: { media: data.media, message: data.message },
    })
  } catch (error) {
    dispatch({
      type: constants.media.CREATE_MEDIA_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateMedia = (id, info) => async (dispatch, getState) => {
  dispatch({ type: constants.media.UPDATE_MEDIA_REQUEST })
  try {
    const { data } = await api.media.updateMedia(id, info)
    const { media } = getState().listMedia
    if (media) {
      const copiedMedia = [...media]
      const index = copiedMedia.findIndex((m) => m._id === id)
      index > -1 && copiedMedia.splice(index, 1, data.media)
      dispatch({
        type: constants.media.LIST_MEDIA_SUCCESS,
        payload: copiedMedia,
      })
    }
    dispatch({
      type: constants.media.UPDATE_MEDIA_SUCCESS,
      payload: { media: data.media, message: data.message },
    })
  } catch (error) {
    dispatch({
      type: constants.media.UPDATE_MEDIA_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteMedia = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.media.DELETE_MEDIA_REQUEST })
  try {
    const { data } = await api.media.deleteMedia(id)
    const { media } = getState().listMedia
    if (media) {
      const filteredMedia = media.filter((m) => m._id !== id)
      dispatch({
        type: constants.media.LIST_MEDIA_SUCCESS,
        payload: filteredMedia,
      })
    }
    dispatch({
      type: constants.media.DELETE_MEDIA_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.media.DELETE_MEDIA_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const actions = {
  listMedia,
  createMedia,
  updateMedia,
  deleteMedia,
}

export default actions
