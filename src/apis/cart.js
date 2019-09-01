import {
  apiHelper
} from './../utils/helpers'

export default {
  getCart() {
    return apiHelper.get('/cart')
  },
  addToCart(productId, quantity) {
    return apiHelper.post('/cart', {
      productId,
      quantity
    })
  },
  addItemToCart(cartId, cartItemId) {
    return apiHelper.post(`/cart/${cartId}/cartItem/${cartItemId}/add`, {
      cartId,
      cartItemId
    })
  },
  subItemFromCart(cartId, cartItemId) {
    return apiHelper.post(`/cart/${cartId}/cartItem/${cartItemId}/sub`, {
      cartId,
      cartItemId
    })
  },
  deleteItemFromCart(cartId, cartItemId) {
    return apiHelper.delete(`/cart/${cartId}/cartItem/${cartItemId}`, {
      cartId,
      cartItemId
    })
  },
  putCart(shippingData) {
    return apiHelper.put('/cart', shippingData)
  }
}