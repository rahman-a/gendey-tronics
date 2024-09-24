import constants from '../constants'
import api from '../api'
import { v4 as uuidv4 } from 'uuid'

const listAllProducts = (query) => async (dispatch) => {
  dispatch({ type: constants.products.LIST_PRODUCTS_REQUEST })
  try {
    const { data } = await api.products.index(query)
    dispatch({
      type: constants.products.LIST_PRODUCTS_SUCCESS,
      products: data.products,
      count: data.count,
    })
  } catch (error) {
    dispatch({
      type: constants.products.LIST_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getOneProduct = (id) => async (dispatch) => {
  dispatch({ type: constants.products.GET_PRODUCT_REQUEST })
  try {
    const { data } = await api.products.getOne(id)
    dispatch({
      type: constants.products.GET_PRODUCT_SUCCESS,
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: constants.products.GET_PRODUCT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createNewProduct = (info) => async (dispatch, getState) => {
  dispatch({ type: constants.products.CREATE_PRODUCT_REQUEST })

  try {
    const { data } = await api.products.create(info)
    dispatch({
      type: constants.products.CREATE_PRODUCT_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.products.CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateProduct = (id, info) => async (dispatch) => {
  dispatch({ type: constants.products.EDIT_PRODUCT_REQUEST })
  try {
    const { data } = await api.products.update(id, info)

    dispatch({
      type: constants.products.GET_PRODUCT_SUCCESS,
      payload: data.product,
    })

    dispatch({
      type: constants.products.EDIT_PRODUCT_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.products.EDIT_PRODUCT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const updateProductImage = (id, info) => async (dispatch, getState) => {
  dispatch({ type: constants.products.EDIT_IMAGE_REQUEST })
  try {
    const { data } = await api.products.updateImage(id, info)
    const { product } = getState().getProduct
    const updatedProduct = { ...product }
    updatedProduct.images.push(data.image)
    updatedProduct.image &&
      updatedProduct.images.push({
        src: updatedProduct.image,
        _id: uuidv4(),
      })
    delete updatedProduct.image
    dispatch({
      type: constants.products.GET_PRODUCT_SUCCESS,
      payload: updatedProduct,
    })
    dispatch({
      type: constants.products.EDIT_IMAGE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.products.EDIT_IMAGE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteProductImage = (id, imageId) => async (dispatch, getState) => {
  dispatch({ type: constants.products.DELETE_IMAGE_REQUEST })
  try {
    const { data } = await api.products.deleteImage(id, imageId)
    const { product } = getState().getProduct
    const updatedProduct = { ...product }
    updatedProduct.images = product.images.filter(
      (image) => image._id !== imageId
    )
    dispatch({
      type: constants.products.GET_PRODUCT_SUCCESS,
      payload: updatedProduct,
    })
    dispatch({
      type: constants.products.DELETE_IMAGE_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.products.DELETE_IMAGE_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: constants.products.DELETE_PRODUCT_REQUEST })
  try {
    const { data } = await api.products.delete(id)
    dispatch({
      type: constants.products.DELETE_PRODUCT_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.products.DELETE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listAllOrders = (query) => async (dispatch) => {
  dispatch({ type: constants.products.LIST_ORDERS_REQUEST })
  try {
    const { data } = await api.products.orders(query)
    dispatch({
      type: constants.products.LIST_ORDERS_SUCCESS,
      orders: data.orders,
      count: data.count,
    })
  } catch (error) {
    dispatch({
      type: constants.products.LIST_ORDERS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const getOrder = (id) => async (dispatch) => {
  dispatch({ type: constants.products.GET_ORDER_REQUEST })
  try {
    const { data } = await api.products.getOrder(id)
    dispatch({
      type: constants.products.GET_ORDER_SUCCESS,
      payload: data.order,
    })
  } catch (error) {
    dispatch({
      type: constants.products.GET_ORDER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const toggleProductListing = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.products.TOGGLE_PRODUCT_LISTING_REQUEST })
  try {
    const { data } = await api.products.toggleListing(id)

    const { product } = getState().getProduct
    if (product) {
      const copiedProduct = { ...product }
      copiedProduct.isListed = data.isListed
      dispatch({
        type: constants.products.GET_PRODUCT_SUCCESS,
        payload: copiedProduct,
      })
    }
    dispatch({ type: constants.products.TOGGLE_PRODUCT_LISTING_SUCCESS })
  } catch (error) {
    dispatch({
      type: constants.products.TOGGLE_PRODUCT_LISTING_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const createOrder = (order) => async (dispatch) => {
  dispatch({ type: constants.products.CREATE_ORDER_REQUEST })
  try {
    const { data } = await api.products.newOrder(order)
    dispatch({
      type: constants.products.CREATE_ORDER_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.products.CREATE_ORDER_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteLink = (id, link) => async (dispatch, getState) => {
  dispatch({ type: constants.courses.DELETE_LINK_REQUEST })

  try {
    const { data } = await api.products.deleteLink(id, link)
    const { product } = getState().getProduct
    if (product) {
      const copiedProduct = { ...product }
      copiedProduct.driveFile = copiedProduct.driveFile.filter(
        (lk) => lk._id.toString() !== link
      )
      dispatch({
        type: constants.products.GET_PRODUCT_SUCCESS,
        payload: copiedProduct,
      })
    }

    dispatch({
      type: constants.courses.DELETE_LINK_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.courses.DELETE_LINK_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const actions = {
  listAllProducts,
  listAllOrders,
  createNewProduct,
  getOrder,
  getOneProduct,
  updateProduct,
  updateProductImage,
  deleteProductImage,
  deleteProduct,
  toggleProductListing,
  createOrder,
  deleteLink,
}

export default actions
