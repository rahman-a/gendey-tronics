import constants from '../constants'
import api from '../api'

const listItems = () => async (dispatch) => {
  dispatch({
    type: constants.menu.LIST_MENU_ITEMS_REQUEST,
  })

  try {
    const { data } = await api.menu.listAllItems()
    dispatch({
      type: constants.menu.LIST_MENU_ITEMS_SUCCESS,
      payload: data.items,
    })
  } catch (error) {
    dispatch({
      type: constants.menu.LIST_MENU_ITEMS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

// create new item
const createItem = (info) => async (dispatch, getState) => {
  dispatch({
    type: constants.menu.CREATE_MENU_ITEM_REQUEST,
  })

  try {
    const payload = new FormData()
    for (let key in info) {
      payload.append(key, info[key])
    }
    const { data } = await api.menu.createItem(payload)

    const { items } = getState().listAllItems

    if (items) {
      const copiedItems = [...items]
      if (info.parent) {
        copiedItems.forEach((item) => {
          if (item._id === info.parent) {
            const isSameOrderFound = item.subItems.some(
              (item) => item.order === parseInt(info.order)
            )
            if (isSameOrderFound) {
              item.subItems.forEach((subItem) => {
                if (subItem.order >= info.order) {
                  subItem.order += 1
                }
              })
            }
            item.subItems.push(data.item)
          }
        })
      } else {
        const isSameOrderFound = copiedItems.some(
          (item) => item.order === parseInt(info.order)
        )
        if (isSameOrderFound) {
          copiedItems.forEach((item) => {
            if (item.order >= info.order) {
              item.order += 1
            }
          })
        }

        copiedItems.push(data.item)
      }
      dispatch({
        type: constants.menu.LIST_MENU_ITEMS_SUCCESS,
        payload: copiedItems,
      })
    }

    dispatch({
      type: constants.menu.CREATE_MENU_ITEM_SUCCESS,
      payload: data.item,
    })
  } catch (error) {
    dispatch({
      type: constants.menu.CREATE_MENU_ITEM_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

// update item
const updateItem = (info, id, parent) => async (dispatch, getState) => {
  dispatch({
    type: constants.menu.UPDATE_MENU_ITEM_REQUEST,
  })

  try {
    const payload = new FormData()
    for (let key in info) {
      payload.append(key, info[key])
    }
    const { data } = await api.menu.updateItem(payload, id, parent)
    const { items } = getState().listAllItems
    if (items) {
      const copiedItems = [...items]
      if (parent) {
        copiedItems.forEach((item) => {
          if (item._id === parent) {
            const sameOrderItem = item.subItems.find(
              (item) => item.order === parseInt(info.order)
            )

            const index = item.subItems.findIndex(
              (subItem) => subItem._id === id
            )
            if (index > -1) {
              if (sameOrderItem) {
                sameOrderItem.order = item.subItems[index].order
              }

              item.subItems[index] = data.item
            }
          }
        })
      } else {
        const sameOrderItem = copiedItems.find(
          (item) => item.order === parseInt(info.order)
        )

        const index = copiedItems.findIndex((item) => item._id === id)
        if (index > -1) {
          if (sameOrderItem) {
            sameOrderItem.order = copiedItems[index].order
          }
          copiedItems[index] = data.item
        }
      }
      dispatch({
        type: constants.menu.LIST_MENU_ITEMS_SUCCESS,
        payload: copiedItems,
      })
    }
    dispatch({
      type: constants.menu.UPDATE_MENU_ITEM_SUCCESS,
      payload: {
        item: data.item,
        message: data.message,
      },
    })
  } catch (error) {
    dispatch({
      type: constants.menu.UPDATE_MENU_ITEM_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

// delete item
const deleteItem = (id, parent, order) => async (dispatch, getState) => {
  dispatch({
    type: constants.menu.DELETE_MENU_ITEM_REQUEST,
  })

  try {
    const { data } = await api.menu.deleteItem(id, parent, order)
    const { items } = getState().listAllItems

    if (items) {
      const copiedItems = [...items]

      if (parent) {
        const targetItem = copiedItems.find((item) => item._id === parent)
        const index = targetItem.subItems.findIndex((item) => item._id === id)
        index > -1 && targetItem.subItems.splice(index, 1)
        targetItem.subItems.forEach((subItem) => {
          if (subItem.order > parseInt(order)) {
            subItem.order -= 1
          }
        })
      } else {
        const index = copiedItems.findIndex((item) => item._id === id)
        index > -1 && copiedItems.splice(index, 1)
        copiedItems.forEach((item) => {
          if (item.order > parseInt(order)) {
            item.order -= 1
          }
        })
      }

      dispatch({
        type: constants.menu.LIST_MENU_ITEMS_SUCCESS,
        payload: copiedItems,
      })
    }
    dispatch({
      type: constants.menu.DELETE_MENU_ITEM_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.menu.DELETE_MENU_ITEM_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listPages = () => async (dispatch) => {
  dispatch({
    type: constants.menu.LIST_PAGES_REQUEST,
  })

  try {
    const { data } = await api.menu.listPages()
    dispatch({
      type: constants.menu.LIST_PAGES_SUCCESS,
      payload: data.pages,
    })
  } catch (error) {
    dispatch({
      type: constants.menu.LIST_PAGES_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const actions = {
  listItems,
  createItem,
  updateItem,
  deleteItem,
  listPages,
}

export default actions
