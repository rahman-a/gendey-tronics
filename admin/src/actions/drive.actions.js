import constants from '../constants'
import api from '../api'

const authenticateMember = () => async (dispatch) => {
  dispatch({ type: constants.drive.AUTH_MEMBER_REQUEST })

  try {
    const { data } = await api.drive.authenticate()
    dispatch({
      type: constants.drive.AUTH_MEMBER_SUCCESS,
      url: data.url ? data.url : null,
      files: data.files ? data.files : null,
    })
  } catch (error) {
    dispatch({
      type: constants.drive.AUTH_MEMBER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getAccessToken = (code) => async (dispatch) => {
  dispatch({ type: constants.drive.ACCESS_TOKEN_REQUEST })

  try {
    const { data } = await api.drive.accessToken(code)

    dispatch({
      type: constants.drive.ACCESS_TOKEN_SUCCESS,
      payload: data.files,
    })
  } catch (error) {
    dispatch({
      type: constants.drive.ACCESS_TOKEN_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteFile = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.drive.DELETE_FILE_REQUEST })

  try {
    const { data } = await api.drive.deleteFile(id)

    let { files } = getState().authenticateMember

    let { files: accessFiles } = getState().getAccessToken

    if (files) {
      let copiedFiles = [...files]
      copiedFiles = copiedFiles.filter((file) => file.id !== id)
      dispatch({
        type: constants.drive.AUTH_MEMBER_SUCCESS,
        files: copiedFiles,
      })
    }

    if (accessFiles) {
      let copiedFiles = [...accessFiles]
      copiedFiles = copiedFiles.filter((file) => file.id !== id)
      dispatch({
        type: constants.drive.ACCESS_TOKEN_SUCCESS,
        payload: copiedFiles,
      })
    }

    dispatch({
      type: constants.drive.DELETE_FILE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.drive.DELETE_FILE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const downloadFile = (id) => async (dispatch) => {
  dispatch({ type: constants.drive.DOWNLOAD_FILE_REQUEST })

  try {
    const { data } = await api.drive.downloadFile(id)
    dispatch({
      type: constants.drive.DOWNLOAD_FILE_SUCCESS,
      payload: data.file,
    })
  } catch (error) {
    dispatch({
      type: constants.drive.DOWNLOAD_FILE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const uploadFile = (info) => async (dispatch) => {
  dispatch({ type: constants.drive.UPLOAD_FILE_REQUEST })

  try {
    const { data } = await api.drive.uploadFile(info)
    dispatch({
      type: constants.drive.UPLOAD_FILE_SUCCESS,
      message: data.message,
      uploaded: data.uploaded,
    })
  } catch (error) {
    let serverError = error.response.data.message
    if (serverError === undefined) {
      serverError = 'something wrong happened, please try again'
    }
    dispatch({
      type: constants.drive.UPLOAD_FILE_FAIL,
      payload: serverError,
    })
  }
}

const resumeFile = (info) => async (dispatch) => {
  dispatch({ type: constants.drive.RESUME_FILE_REQUEST })

  try {
    const { data } = await api.drive.resume(info)

    dispatch({
      type: constants.drive.RESUME_FILE_SUCCESS,
      message: data.message,
      range: data.range,
    })
  } catch (error) {
    let serverError = error.response.data.message
    if (serverError === undefined) {
      serverError = 'something wrong happened, please try again'
    }
    dispatch({
      type: constants.drive.RESUME_FILE_FAIL,
      payload: serverError,
    })
  }
}

const deletePermission = (id) => async (dispatch) => {
  dispatch({ type: constants.drive.DELETE_FILE_PERMISSION_REQUEST })

  try {
    await api.drive.deletePermission(id)

    dispatch({ type: constants.drive.DELETE_FILE_PERMISSION_SUCCESS })
  } catch (error) {
    dispatch({
      type: constants.drive.DELETE_FILE_PERMISSION_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const searchFiles = (query) => async (dispatch) => {
  dispatch({ type: constants.drive.SEARCH_FILES_REQUEST })

  try {
    const { data } = await api.drive.search(query)
    dispatch({
      type: constants.drive.SEARCH_FILES_SUCCESS,
      payload: data.files,
    })
  } catch (error) {
    dispatch({
      type: constants.drive.SEARCH_FILES_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const actions = {
  authenticateMember,
  getAccessToken,
  uploadFile,
  downloadFile,
  deletePermission,
  deleteFile,
  resumeFile,
  searchFiles,
}

export default actions
