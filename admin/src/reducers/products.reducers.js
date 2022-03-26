import constants from "../constants";

const listAllProducts = (state, action) => {
    switch(action.type){
        case constants.products.LIST_PRODUCTS_REQUEST: 
            return {loading: true, error:null}
        case constants.products.LIST_PRODUCTS_SUCCESS:
            return {loading:false, error:null, products:action.products, count:action.count}
        case constants.products.LIST_PRODUCTS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.LIST_PRODUCTS_RESET: 
            return {loading:false, error:null, products:null, count:null}
        default:
            return {...state}
    }
}

const getProduct = (state, action) => {
    switch(action.type){
        case constants.products.GET_PRODUCT_REQUEST: 
            return {loading: true, error:null}
        case constants.products.GET_PRODUCT_SUCCESS: 
            return {loading:false, error:null, product:action.payload}
        case constants.products.GET_PRODUCT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.GET_PRODUCT_RESET: 
            return {loading:false, error:null, product:null}
        default:
            return {...state}
    }
}

const editProduct = (state, action) => {
    switch(action.type){
        case constants.products.EDIT_PRODUCT_REQUEST: 
            return {loading: true, error:null}
        case constants.products.EDIT_PRODUCT_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.products.EDIT_PRODUCT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.EDIT_PRODUCT_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
} 

const editProductImage = (state, action) => {
    switch(action.type){
        case constants.products.EDIT_IMAGE_REQUEST: 
            return {loading: true, error:null}
        case constants.products.EDIT_IMAGE_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.products.EDIT_IMAGE_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.EDIT_IMAGE_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
} 

const createProduct = (state, action) => {
    switch(action.type){
        case constants.products.CREATE_PRODUCT_REQUEST: 
            return {loading: true, error:null}
        case constants.products.CREATE_PRODUCT_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.products.CREATE_PRODUCT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.CREATE_PRODUCT_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
} 

const deleteProduct = (state, action) => {
    switch(action.type){
        case constants.products.DELETE_PRODUCT_REQUEST: 
            return {loading: true, error:null}
        case constants.products.DELETE_PRODUCT_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.products.DELETE_PRODUCT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.DELETE_PRODUCT_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
} 

const listAllOrders = (state, action) => {
    switch(action.type){
        case constants.products.LIST_ORDERS_REQUEST: 
            return {loading: true, error:null}
        case constants.products.LIST_ORDERS_SUCCESS: 
            return {loading:false, error:null, orders:action.orders, count:action.count}
        case constants.products.LIST_ORDERS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.LIST_ORDERS_RESET: 
            return {loading:false, error:null, orders:null, count:null}
        default:
            return {...state}
    }
}

const getOrder = (state, action) => {
    switch(action.type){
        case constants.products.GET_ORDER_REQUEST: 
            return {loading: true, error:null}
        case constants.products.GET_ORDER_SUCCESS: 
            return {loading:false, error:null, order:action.payload}
        case constants.products.GET_ORDER_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.GET_ORDER_RESET: 
            return {loading:false, error:null, order:null}
        default:
            return {...state}
    }
}

const toggleListing = (state, action) => {
    switch(action.type){
        case constants.products.TOGGLE_PRODUCT_LISTING_REQUEST: 
            return {loading: true, error:null}
        case constants.products.TOGGLE_PRODUCT_LISTING_SUCCESS: 
            return {loading:false, error:null}
        case constants.products.TOGGLE_PRODUCT_LISTING_FAIL: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

const createOrder = (state, action) => {
    switch(action.type){
        case constants.products.CREATE_ORDER_REQUEST: 
            return {loading: true, error:null}
        case constants.products.CREATE_ORDER_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.products.CREATE_ORDER_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.CREATE_ORDER_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const deleteProductLink = (state, action) => {
    switch(action.type){
        case constants.products.DELETE_LINK_REQUEST: 
            return {loading: true, error:null}
        case constants.products.DELETE_LINK_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.products.DELETE_LINK_FAIL: 
            return {loading:false, error:action.payload}
        case constants.products.DELETE_LINK_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const reducer = {
    listAllProducts,
    getProduct,
    editProduct,
    editProductImage,
    createProduct,
    deleteProduct,
    listAllOrders,
    getOrder,
    toggleListing,
    createOrder,
    deleteProductLink
}

export default reducer