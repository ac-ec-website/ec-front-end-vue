import { apiHelper } from './../utils/helpers'

export default {
  postCoupon(couponCode) {
    return apiHelper.post('/coupon', couponCode)
  },
  getCoupon() {
    return apiHelper.get('/coupon')
  },
  deleteCoupon(couponCode) {
    return apiHelper.delete('/coupon', couponCode)
  }
}
