import { apiHelper } from '@/utils/helpers'

export default {
  getUsers() {
    return apiHelper.get(`/admin/users`)
  },
  putUser(profile) {
    return apiHelper.put(`/admin/user`, profile)
  },
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  }
}
