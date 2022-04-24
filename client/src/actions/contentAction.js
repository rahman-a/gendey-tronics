import constants from '../constants'
import api from '../api'

const listNavItems = () => async (dispatch) => {
  dispatch({
    type: constants.content.LIST_NAV_ITEMS_REQUEST,
  })

  try {
    const { data } = await api.content.listNavItems()
    dispatch({
      type: constants.content.LIST_NAV_ITEMS_SUCCESS,
      payload: data.items,
    })
  } catch (error) {
    dispatch({
      type: constants.content.LIST_NAV_ITEMS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listGalleryItems = (query) => async (dispatch) => {
  dispatch({
    type: constants.content.LIST_GALLERY_ITEMS_REQUEST,
  })

  try {
    const { data } = await api.content.listGalleryItems(query)
    dispatch({
      type: constants.content.LIST_GALLERY_ITEMS_SUCCESS,
      payload: { images: data.media, count: data.count },
    })
  } catch (error) {
    dispatch({
      type: constants.content.LIST_GALLERY_ITEMS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const actions = {
  listNavItems,
  listGalleryItems,
}

export default actions
