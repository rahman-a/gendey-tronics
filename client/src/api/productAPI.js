import { service } from './service'

export const productApi = {
  listProducts(type, isMainPage) {
    const url = type
      ? `products?type=${type}&isPublic=true${
          isMainPage ? '&isMainPage=true' : ''
        }`
      : `products?isPublic=true${isMainPage ? '&isMainPage=true' : ''}`
    return service().get(url)
  },
  getProduct(id, type) {
    const url = type === 'public' ? `products/${id}/public` : `products/${id}`
    return service().get(url)
  },
  addProductToWishlist(data) {
    return service().post('wishlist/add', data)
  },
  removeProductFromWishlist(id) {
    return service().delete(`wishlist/${id}`)
  },
  listFavouriteProduct() {
    return service().get('wishlist?type=product')
  },
  createOrder(data) {
    return service().post('orders/new', data)
  },
  orderData(id) {
    return service().get(`orders/${id}`)
  },
  listOrders() {
    return service().get('orders')
  },
  updateOrder(id) {
    return service().patch(`orders/${id}`)
  },
  addToCart(data) {
    return service().post('products/cart/new', data)
  },
  removeFromCart(id) {
    return service().delete(`products/cart/${id}`)
  },
  listCartItems() {
    return service().get('products/cart')
  },
  deleteCartItems() {
    return service().delete('products/cart')
  },
  bookCall(data) {
    return service().post('calls/book', data)
  },
}
