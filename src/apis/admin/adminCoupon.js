import { apiHelper } from '@/utils/helpers'

export default {
  getCoupons () {
    return apiHelper.get(`/admin/coupons`)
  },
  getCoupon (couponId) {
    return apiHelper.get(`/admin/coupons/${couponId}`)
  },
  postCoupon (formData) {
    return apiHelper.post(`/admin/coupons`, formData)
  },
  putCoupon (couponId, formData) {
    return apiHelper.put(`/admin/coupons/${couponId}`, formData)
  },
  deleteCoupon (couponId) {
    return apiHelper.delete(`/admin/coupons/${couponId}`)
  }
}
