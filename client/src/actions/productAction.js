import constants from '../constants'
import api from '../api'
import product from '../constants/productConstant'

const listProducts = (type, isMainPage) => async (dispatch) => {
  dispatch({ type: constants.product.LIST_PRODUCTS_REQUEST })
  try {
    const { data } = await api.products.listProducts(type, isMainPage)
    dispatch({
      type: constants.product.LIST_PRODUCTS_SUCCESS,
      payload: data.products,
    })
  } catch (error) {
    dispatch({
      type: constants.product.LIST_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getProductData = (id, type) => async (dispatch) => {
  dispatch({ type: constants.product.GET_PRODUCT_REQUEST })
  try {
    const { data } = await api.products.getProduct(id, type)
    dispatch({
      type: constants.product.GET_PRODUCT_SUCCESS,
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: constants.product.GET_PRODUCT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listFavouriteProducts = () => async (dispatch) => {
  dispatch({ type: constants.product.LIST_FAVOURITE_PRODUCTS_REQUEST })
  try {
    const { data } = await api.products.listFavouriteProduct()
    dispatch({
      type: constants.product.LIST_FAVOURITE_PRODUCTS_SUCCESS,
      payload: data.items,
    })
  } catch (error) {
    dispatch({
      type: constants.product.LIST_FAVOURITE_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const addProductToWishlist = (info) => async (dispatch, getState) => {
  dispatch({ type: constants.product.ADD_PRODUCT_TO_WISHLIST_REQUEST })
  try {
    await api.products.addProductToWishlist(info)
    let { product } = getState().productData
    product.isFav = true
    dispatch({ type: constants.product.GET_PRODUCT_SUCCESS, payload: product })
    dispatch({ type: constants.product.ADD_PRODUCT_TO_WISHLIST_SUCCESS })
  } catch (error) {
    dispatch({
      type: constants.product.ADD_PRODUCT_TO_WISHLIST_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}
const removeProductFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.product.REMOVE_PRODUCT_FROM_WISHLIST_REQUEST })
  try {
    await api.products.removeProductFromWishlist(id)
    let { product } = getState().productData
    const { products } = getState().FavProducts
    if (product) {
      product.isFav = false
    }
    if (products) {
      const copiedProducts = [...products]
      const index = copiedProducts.findIndex((item) => item._id === id)
      copiedProducts.splice(index, 1)
      dispatch({
        type: constants.product.LIST_FAVOURITE_PRODUCTS_SUCCESS,
        payload: copiedProducts,
      })
    }
    dispatch({ type: constants.product.GET_PRODUCT_SUCCESS, payload: product })
    dispatch({ type: constants.product.REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS })
  } catch (error) {
    dispatch({
      type: constants.product.REMOVE_PRODUCT_FROM_WISHLIST_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createOrder = (order) => async (dispatch) => {
  dispatch({ type: constants.product.CREATE_ORDER_REQUEST })
  try {
    const { data } = await api.products.createOrder(order)
    dispatch({
      type: constants.product.CREATE_ORDER_SUCCESS,
      payload: data.order,
    })
  } catch (error) {
    dispatch({
      type: constants.product.CREATE_ORDER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getOrderData = (id) => async (dispatch) => {
  dispatch({ type: constants.product.GET_ORDER_REQUEST })
  try {
    const { data } = await api.products.orderData(id)
    dispatch({ type: constants.product.GET_ORDER_SUCCESS, payload: data.order })
  } catch (error) {
    dispatch({
      type: constants.product.GET_ORDER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listUserOrders = () => async (dispatch) => {
  dispatch({ type: constants.product.LIST_ORDERS_REQUEST })
  try {
    const { data } = await api.products.listOrders()
    dispatch({
      type: constants.product.LIST_ORDERS_SUCCESS,
      payload: data.orders,
    })
  } catch (error) {
    dispatch({
      type: constants.product.LIST_ORDERS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateUserOrder = (order) => async (dispatch) => {
  dispatch({ type: constants.product.UPDATE_ORDER_REQUEST })
  try {
    const { data } = await api.products.updateOrder(order)
    dispatch({ type: constants.product.GET_ORDER_SUCCESS, payload: data.order })
    dispatch({
      type: constants.product.UPDATE_ORDER_SUCCESS,
      payload: data.order,
    })
  } catch (error) {
    dispatch({
      type: constants.product.UPDATE_ORDER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listCartItems = () => async (dispatch) => {
  dispatch({ type: constants.product.LIST_CART_ITEMS_REQUEST })
  try {
    const { data } = await api.products.listCartItems()
    dispatch({
      type: constants.product.LIST_CART_ITEMS_SUCCESS,
      payload: data.items,
    })
  } catch (error) {
    dispatch({
      type: constants.product.LIST_CART_ITEMS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const addItemToCart = (item) => async (dispatch, getState) => {
  dispatch({ type: constants.product.ADD_ITEM_TO_CART_REQUEST })
  try {
    const { data } = await api.products.addToCart(item)

    let cartItems = getState().cartItems.items || []
    const copiedCartItem = JSON.parse(JSON.stringify(cartItems))
    copiedCartItem.push(data.item)
    dispatch({
      type: constants.product.LIST_CART_ITEMS_SUCCESS,
      payload: copiedCartItem,
    })

    dispatch({
      type: constants.product.ADD_ITEM_TO_CART_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.product.ADD_ITEM_TO_CART_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.product.REMOVE_ITEM_FROM_CART_REQUEST })
  try {
    const { data } = await api.products.removeFromCart(id)
    let cartItems = getState().cartItems.items
    cartItems = cartItems.filter(
      (item) => item._id.toString() !== data.item.toString()
    )
    dispatch({
      type: constants.product.LIST_CART_ITEMS_SUCCESS,
      payload: cartItems,
    })
    dispatch({
      type: constants.product.REMOVE_ITEM_FROM_CART_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.product.REMOVE_ITEM_FROM_CART_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const clearCart = () => async (dispatch) => {
  dispatch({ type: constants.product.CLEAR_CART_REQUEST })
  try {
    const { data } = await api.products.deleteCartItems()
    dispatch({ type: constants.product.LIST_CART_ITEMS_RESET })
    dispatch({
      type: constants.product.CLEAR_CART_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.product.CLEAR_CART_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const bookCall = (call) => async (dispatch) => {
  dispatch({ type: constants.product.BOOK_CALL_REQUEST })
  try {
    const { data } = await api.products.bookCall(call)
    dispatch({
      type: constants.product.BOOK_CALL_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.product.BOOK_CALL_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const productAction = {
  listProducts: listProducts,
  ProductData: getProductData,
  addProductToWishlist: addProductToWishlist,
  removeProductFromWishlist: removeProductFromWishlist,
  newOrder: createOrder,
  orderData: getOrderData,
  listOrders: listUserOrders,
  updateOrder: updateUserOrder,
  listItems: listCartItems,
  newItem: addItemToCart,
  removeItem: removeItemFromCart,
  FavProducts: listFavouriteProducts,
  clearCart,
  bookCall,
}

export default productAction
