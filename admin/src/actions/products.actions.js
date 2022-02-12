import constants from '../constants'
import api from '../api'

const listAllProducts = (query) => async (dispatch) => {
    dispatch({type: constants.products.LIST_PRODUCTS_REQUEST}) 
    try {
        const {data} = await api.products.index(query) 
        dispatch({
            type:constants.products.LIST_PRODUCTS_SUCCESS,
            products:data.products,
            count:data.count
        })
    } catch (error) {
        dispatch({
            type: constants.products.LIST_PRODUCTS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getOneProduct = (id) => async (dispatch) => {
    dispatch({type: constants.products.GET_PRODUCT_REQUEST}) 
    try {
        const {data} = await api.products.getOne(id)
        dispatch({
            type:constants.products.GET_PRODUCT_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispatch({
            type: constants.products.GET_PRODUCT_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const createNewProduct = info => async (dispatch, getState) => {
    dispatch({type:constants.products.CREATE_PRODUCT_REQUEST}) 

    try {
        const {data} = await api.products.create(info) 
        dispatch({type:constants.products.CREATE_PRODUCT_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.products.CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

const updateProduct = (id, info) => async (dispatch) => {
    dispatch({type: constants.products.EDIT_PRODUCT_REQUEST}) 
    try {
        const {data} = await api.products.update(id, info)
        
        dispatch({
            type:constants.products.GET_PRODUCT_SUCCESS,
            payload:data.product
        })
        
        dispatch({
            type:constants.products.EDIT_PRODUCT_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type: constants.products.EDIT_PRODUCT_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const updateProductImage = (id, info) => async (dispatch, getState) => {
    dispatch({type: constants.products.EDIT_IMAGE_REQUEST}) 
    try {
        const {data} = await api.products.updateImage(id, info)
        const {product} = getState().getProduct 
        product.image = data.image
        dispatch({
            type:constants.products.GET_PRODUCT_SUCCESS,
            payload:product
        })
        dispatch({
            type:constants.products.EDIT_IMAGE_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type: constants.products.EDIT_IMAGE_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const deleteProduct = (id) => async (dispatch) => {
    dispatch({type: constants.products.DELETE_PRODUCT_REQUEST}) 
    try {
        const {data} = await api.products.delete(id)
        dispatch({
            type:constants.products.DELETE_PRODUCT_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type: constants.products.DELETE_PRODUCT_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const listAllOrders = (query) => async (dispatch) => {
    dispatch({type: constants.products.LIST_ORDERS_REQUEST}) 
    try {
        const {data} = await api.products.orders(query)
        dispatch({
            type:constants.products.LIST_ORDERS_SUCCESS,
            orders:data.orders,
            count:data.count
        })
    } catch (error) {
        dispatch({
            type: constants.products.LIST_ORDERS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getOrder = (id) => async (dispatch) => {
    dispatch({type: constants.products.GET_ORDER_REQUEST}) 
    try {
        const {data} = await api.products.getOrder(id)
        dispatch({
            type:constants.products.GET_ORDER_SUCCESS,
            payload:data.order
        })
    } catch (error) {
        dispatch({
            type: constants.products.GET_ORDER_FAIL,
            payload:error.response && error.response.data.message
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
    deleteProduct
}

export default actions

// let {products} = getState().listAllProducts 
        // if(products) {
        //     const {count} = getState().listAllProducts 
        //     products = [...products, data.product]
        //     dispatch({
        //         type:constants.products.LIST_PRODUCTS_SUCCESS,
        //         products:products,
        //         count:count + 1
        //     })
        // }