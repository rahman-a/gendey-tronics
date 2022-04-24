import constants from '../constants'

const createItem = (state, action) => {
  const cases = {
    [constants.menu.CREATE_MENU_ITEM_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.menu.CREATE_MENU_ITEM_SUCCESS]: {
      isLoading: false,
      error: null,
      item: action.payload,
      message: 'Item created successfully',
    },
    [constants.menu.CREATE_MENU_ITEM_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.menu.CREATE_MENU_ITEM_RESET]: {
      isLoading: false,
      error: null,
      item: null,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const updateItem = (state, action) => {
  const cases = {
    [constants.menu.UPDATE_MENU_ITEM_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.menu.UPDATE_MENU_ITEM_SUCCESS]: {
      isLoading: false,
      error: null,
      item: action.payload?.item,
      message: action.payload?.message,
    },
    [constants.menu.UPDATE_MENU_ITEM_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.menu.UPDATE_MENU_ITEM_RESET]: {
      isLoading: false,
      error: null,
      item: null,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const deleteItem = (state, action) => {
  const cases = {
    [constants.menu.DELETE_MENU_ITEM_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.menu.DELETE_MENU_ITEM_SUCCESS]: {
      isLoading: false,
      error: null,
      message: action.payload,
    },
    [constants.menu.DELETE_MENU_ITEM_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.menu.DELETE_MENU_ITEM_RESET]: {
      isLoading: false,
      error: null,
      message: null,
    },
  }

  return cases[action.type] || { ...state }
}

const listAllItems = (state, action) => {
  const cases = {
    [constants.menu.LIST_MENU_ITEMS_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.menu.LIST_MENU_ITEMS_SUCCESS]: {
      isLoading: false,
      error: null,
      items: action.payload,
    },
    [constants.menu.LIST_MENU_ITEMS_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.menu.LIST_MENU_ITEMS_RESET]: {
      isLoading: false,
      error: null,
      items: null,
    },
  }

  return cases[action.type] || { ...state }
}

const listPages = (state, action) => {
  const cases = {
    [constants.menu.LIST_PAGES_REQUEST]: {
      isLoading: true,
      error: null,
    },
    [constants.menu.LIST_PAGES_SUCCESS]: {
      isLoading: false,
      error: null,
      pages: action.payload,
    },
    [constants.menu.LIST_PAGES_FAIL]: {
      isLoading: false,
      error: action.payload,
    },
    [constants.menu.LIST_PAGES_RESET]: {
      isLoading: false,
      error: null,
      pages: null,
    },
  }

  return cases[action.type] || { ...state }
}

const reducer = {
  createItem,
  updateItem,
  deleteItem,
  listAllItems,
  listPages,
}

export default reducer
