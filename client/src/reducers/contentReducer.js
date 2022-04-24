import constants from '../constants'

const listNavItems = (state, action) => {
  switch (action.type) {
    case constants.content.LIST_NAV_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case constants.content.LIST_NAV_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        items: action.payload,
      }
    case constants.content.LIST_NAV_ITEMS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case constants.content.LIST_NAV_ITEMS_RESET:
      return {
        ...state,
        isLoading: false,
        error: null,
        items: [],
      }
    default:
      return { ...state }
  }
}

const listGalleryItems = (state, action) => {
  switch (action.type) {
    case constants.content.LIST_GALLERY_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case constants.content.LIST_GALLERY_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        images: action?.payload?.images,
        count: action?.payload?.count,
      }
    case constants.content.LIST_GALLERY_ITEMS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case constants.content.LIST_GALLERY_ITEMS_RESET:
      return {
        ...state,
        isLoading: false,
        error: null,
        images: [],
        count: 0,
      }
    default:
      return { ...state }
  }
}

const reducer = {
  listNavItems,
  listGalleryItems,
}

export default reducer
