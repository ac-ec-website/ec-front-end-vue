import {
  apiHelper
}
from '@/utils/helpers'

export default {
  signIn(profile) {
    return apiHelper.post(`/admin/signin`, profile)
  },
  signUp(profile) {
    return apiHelper.post(`/admin/signup`, profile)
  },
}