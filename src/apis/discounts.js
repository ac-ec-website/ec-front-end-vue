import {
  apiHelper
} from './../utils/helpers'

export default {
  getDiscount () {
    return apiHelper.get('/discount')
  }
}
