import service from './service'

const adminAPI = {
  login(data) {
    return service().post('users/login/admin', data)
  },
  logout() {
    return service().post('users/logout/admin')
  },
  sliders() {
    return service().get('sliders')
  },
  createSlider(data) {
    return service().post('sliders/add', data)
  },
  deleteSlider(id) {
    return service().delete(`sliders/${id}`)
  },
  getInfo() {
    return service().get('admin/info')
  },
  updateInfo(data) {
    return service().patch('admin/info', data)
  },
  updateImage(data) {
    return service().patch('admin/image', data)
  },
  updatePassword(data) {
    return service().patch('admin/password', data)
  },
  avatar() {
    return service().get('admin/avatar')
  },
}

export default adminAPI
