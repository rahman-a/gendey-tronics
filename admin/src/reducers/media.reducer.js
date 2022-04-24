import constants from '../constants'

const createMedia = (state, action) => {
  const cases = {
    [constants.media.CREATE_MEDIA_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.media.CREATE_MEDIA_SUCCESS]: {
      isLoading: false,
      error: null,
      media: action.payload?.media,
      message: action.payload?.message,
    },
    [constants.media.CREATE_MEDIA_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.media.CREATE_MEDIA_RESET]: {
      isLoading: false,
      error: null,
      media: null,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const listMedia = (state, action) => {
  const cases = {
    [constants.media.LIST_MEDIA_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.media.LIST_MEDIA_SUCCESS]: {
      isLoading: false,
      error: null,
      media: action.payload,
    },
    [constants.media.LIST_MEDIA_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.media.LIST_MEDIA_RESET]: {
      isLoading: false,
      error: null,
      media: null,
    },
  }

  return cases[action.type] || { ...state }
}

const updateMedia = (state, action) => {
  const cases = {
    [constants.media.UPDATE_MEDIA_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.media.UPDATE_MEDIA_SUCCESS]: {
      isLoading: false,
      error: null,
      media: action.payload?.media,
      message: action.payload?.message,
    },
    [constants.media.UPDATE_MEDIA_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.media.UPDATE_MEDIA_RESET]: {
      isLoading: false,
      error: null,
      media: null,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const deleteMedia = (state, action) => {
  const cases = {
    [constants.media.DELETE_MEDIA_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.media.DELETE_MEDIA_SUCCESS]: {
      isLoading: false,
      error: null,
      message: action.payload,
    },
    [constants.media.DELETE_MEDIA_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.media.DELETE_MEDIA_RESET]: {
      isLoading: false,
      error: null,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const reducer = {
  createMedia,
  listMedia,
  updateMedia,
  deleteMedia,
}

export default reducer
