import {
  apiHelper
}
from '@/utils/helpers'

export default {
  getUsers() {
    return apiHelper.get(`/admin/users`)
  },
  putUser(profile) {
    return apiHelper.put(`/admin/user`, profile)
  },
}