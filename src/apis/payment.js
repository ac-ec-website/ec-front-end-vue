import {
  apiHelper
} from './../utils/helpers'

export default {
  getPayment() {
    return apiHelper.get(`/payment`)
  }
}