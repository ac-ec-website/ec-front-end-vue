import {
  apiHelper
} from './../utils/helpers'

export default {
  postCoupon(couponCode) {
    return apiHelper.post('/coupon',
      couponCode
    )
  },
}