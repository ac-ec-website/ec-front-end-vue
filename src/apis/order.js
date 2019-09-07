import {
  apiHelper
} from './../utils/helpers'

export default {
  postOrder(formData) {
    return apiHelper.post('/order', formData)
  },
  getOrder() {
    return apiHelper.get('/order')
  },
}