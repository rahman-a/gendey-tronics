import constants from '../constants'


const listProductsReducer = (state, action) => {
    switch(action.type){
        case constants.product.LIST_PRODUCTS_REQUEST: 
            return {loading:true, error:null} 
        case constants.product.LIST_PRODUCTS_SUCCESS: 
            return {loading:false, error:null, products:action.payload} 
        case constants.product.LIST_PRODUCTS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.LIST_PRODUCTS_RESET: 
            return {loading:false, error:null, products:null}
        default:
            return {...state}
    }
}

const getProductDetail = (state, action) => {
    switch(action.type){
        case constants.product.GET_PRODUCT_REQUEST: 
            return {loading:true, error:null} 
        case constants.product.GET_PRODUCT_SUCCESS: 
            return {loading:false, error:null, product:action.payload} 
        case constants.product.GET_PRODUCT_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.GET_PRODUCT_RESET: 
            return {loading:false, error:null, product:null}
        default:
            return {...state}
    }
}

const listFavouriteProductsReducer = (state, action) => {
    switch(action.type){
        case constants.product.LIST_FAVOURITE_PRODUCTS_REQUEST: 
            return {loading:true, error:null} 
        case constants.product.LIST_FAVOURITE_PRODUCTS_SUCCESS: 
            return {loading:false, error:null, products:action.payload} 
        case constants.product.LIST_FAVOURITE_PRODUCTS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.LIST_FAVOURITE_PRODUCTS_RESET: 
            return {loading:false, error:null, products:null}
        default:
            return {...state}
    }
}

const addProductToWishlistReducer = (state, action) => {
    switch(action.type) {
        case constants.product.ADD_PRODUCT_TO_WISHLIST_REQUEST: 
            return {loading:true, error:null}
        case constants.product.ADD_PRODUCT_TO_WISHLIST_SUCCESS: 
            return {loading:false, error:null, isAdded:true} 
        case constants.product.ADD_PRODUCT_TO_WISHLIST_FAIL: 
            return {loading:false, error:false} 
        case constants.product.ADD_PRODUCT_TO_WISHLIST_RESET: 
            return {loading:false, error:null, isAdded:false}
        default:
            return {...state}
    }
}

const removeProductFromWishlistReducer = (state, action) => {
    switch(action.type) {
        case constants.product.REMOVE_PRODUCT_FROM_WISHLIST_REQUEST: 
            return {loading:true, error:null}
        case constants.product.REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS: 
            return {loading:false, error:null, isRemoved:true} 
        case constants.product.REMOVE_PRODUCT_FROM_WISHLIST_FAIL: 
            return {loading:false, error:false} 
        case constants.product.REMOVE_PRODUCT_FROM_WISHLIST_RESET: 
            return {loading:false, error:null, isRemoved:false}
        default:
            return {...state}
    }
}

const createOrderReducer = (state, action) => {
    switch(action.type){
        case constants.product.CREATE_ORDER_REQUEST: 
            return {loading:true, error:null} 
        case constants.product.CREATE_ORDER_SUCCESS: 
            return {loading:false, error:null, order:action.payload} 
        case constants.product.CREATE_ORDER_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.CREATE_ORDER_RESET: 
            return {loading:false, error:null, order:null}
        default:
            return {...state}
    }
}

const getOrderByIdReducer = (state, action) => {
    switch(action.type){
        case constants.product.GET_ORDER_REQUEST: 
            return {loading:true, error:null} 
        case constants.product.GET_ORDER_SUCCESS: 
            return {loading:false, error:null, order:action.payload} 
        case constants.product.GET_ORDER_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.GET_ORDER_RESET: 
            return {loading:false, error:null, order:null}
        default:
            return {...state}
    }
}

const listUserOrdersReducer = (state, action) => {
    switch(action.type){
        case constants.product.LIST_ORDERS_REQUEST: 
            return {loading:true, error:null} 
        case constants.product.LIST_ORDERS_SUCCESS: 
            return {loading:false, error:null, orders:action.payload} 
        case constants.product.LIST_ORDERS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.LIST_ORDERS_RESET: 
            return {loading:false, error:null, orders:null}
        default:
            return {...state}
    }
}

const updateOrderDataReducer = (state, action) => {
    switch(action.type){
        case constants.product.UPDATE_ORDER_REQUEST: 
            return {loading:true, error:null} 
        case constants.product.UPDATE_ORDER_SUCCESS: 
            return {loading:false, error:null, order:action.payload} 
        case constants.product.UPDATE_ORDER_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.UPDATE_ORDER_RESET: 
            return {loading:false, error:null, order:null}
        default:
            return {...state}
    }
}


const addItemToCartReducer = (state, action) => { 
    switch(action.type) {
        case constants.product.ADD_ITEM_TO_CART_REQUEST: 
            return {loading:true, error:null}
        case constants.product.ADD_ITEM_TO_CART_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.product.ADD_ITEM_TO_CART_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.ADD_ITEM_TO_CART_RESET: 
            return {loading:false, error:null, message:null}
        default:
           return {...state}
    }
}

const removeItemFromCartReducer = (state, action) => {
    switch(action.type) {
        case constants.product.REMOVE_ITEM_FROM_CART_REQUEST: 
            return {loading:true, error:null}
        case constants.product.REMOVE_ITEM_FROM_CART_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.product.REMOVE_ITEM_FROM_CART_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.REMOVE_ITEM_FROM_CART_RESET: 
            return {loading:false, error:null, message:null}
        default:
           return {...state}
    }
}

const listCartItemsReducer = (state, action) => {
    switch(action.type) {
        case constants.product.LIST_CART_ITEMS_REQUEST: 
            return {loading:true, error:null}
        case constants.product.LIST_CART_ITEMS_SUCCESS: 
            return {loading:false, error:null, items:action.payload}
        case constants.product.LIST_CART_ITEMS_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.LIST_CART_ITEMS_RESET: 
            return {loading:false, error:null, items:null}
        default:
           return {...state}
    }
}

const clearCartReducer = (state, action) => {
    switch(action.type) {
        case constants.product.CLEAR_CART_REQUEST: 
            return {loading:true, error:null}
        case constants.product.CLEAR_CART_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.product.CLEAR_CART_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.CLEAR_CART_RESET: 
            return {loading:false, error:null, message:null}
        default:
           return {...state}
    }
}

const bookCallReducer = (state, action) => {
    switch(action.type) {
        case constants.product.BOOK_CALL_REQUEST: 
            return {loading:true, error:null}
        case constants.product.BOOK_CALL_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case constants.product.BOOK_CALL_FAIL: 
            return {loading:false, error:action.payload}
        case constants.product.BOOK_CALL_RESET: 
            return {loading:false, error:null, message:null}
        default:
           return {...state}
    }
}


const productReducer = {
    listProducts:listProductsReducer,
    productData:getProductDetail,
    addProductToWishlist:addProductToWishlistReducer,
    removeProductFromWishlist:removeProductFromWishlistReducer,
    newOrder:createOrderReducer,
    orderData:getOrderByIdReducer,
    listOrders:listUserOrdersReducer,
    updateOrder:updateOrderDataReducer,
    newItem:addItemToCartReducer,
    removeItem:removeItemFromCartReducer,
    cartItems:listCartItemsReducer,
    clearCart:clearCartReducer,
    FavProducts:listFavouriteProductsReducer,
    bookCall:bookCallReducer
}

export default productReducer