// faut verifier c'est bourbier un peu

import http from '../api'
class TaskDataService {
  getAll () {
    return http.get('/tasks')
  }

  create (data) {
    return http.post('/tasks', data)
  }

  get (id) {
    return http.get(`/tasks/${id}`)
  }

  update (id, data) {
    return http.put(`/tasks/${id}`, data)
  }

  delete (id) {
    return http.delete(`/tasks/${id}`)
  }
}
export default new TaskDataService()
