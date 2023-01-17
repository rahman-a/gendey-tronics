import service from './service'

const menuAPI = {
  listAllItems: () => {
    return service().get('/menu')
  },
  listPages() {
    return service().get('menu/pages')
  },
  createItem: (data) => {
    return service().post('/menu/new', data)
  },
  updateItem: (data, id, parent) => {
    const url = parent ? `/menu/${id}/${parent}` : `/menu/${id}`
    return service().patch(url, data)
  },
  deleteItem: (id, parent, order) => {
    const url = parent
      ? `/menu/${id}/${parent}?order=${order}`
      : `/menu/${id}?order=${order}`
    return service().delete(url)
  },
}

export default menuAPI
