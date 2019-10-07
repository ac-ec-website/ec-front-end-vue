import { apiHelper } from '@/utils/helpers'

export default {
  getDiscounts() {
    return apiHelper.get(`/admin/discounts`)
  },
  getDiscount(discountId) {
    return apiHelper.get(`/admin/discounts/${discountId}`)
  },
  postDiscount(formData) {
    return apiHelper.post(`/admin/discounts`, formData)
  },
  putDiscount(discountId, formData) {
    return apiHelper.put(`/admin/discounts/${discountId}`, formData)
  },
  deleteDiscount(discountId) {
    return apiHelper.delete(`/admin/discounts/${discountId}`)
  }
}
