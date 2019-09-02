import {
  apiHelper
}
from '@/utils/helpers'

export default {
  getOrders() {
    return apiHelper.get(`/admin/orders`)
  },
  getOrder(orderId) {
    return apiHelper.get(`/admin/orders/${orderId}`)
  },
  putOrder(orderId, value) {
    return apiHelper.put(`/admin/orders/${orderId}`, value)
  },
}