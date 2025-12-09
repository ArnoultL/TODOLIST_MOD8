import http from '../api'

class TaskDataService {
  // ============ TÂCHES (avec sous-tâches imbriquées) ============

  // Récupérer toutes les tâches racines avec l'arbre complet
  getAllTasks() {
    return http.get('/tasks')
  }

  // Récupérer une tâche spécifique avec ses sous-tâches
  getTask(id) {
    return http.get(`/tasks/${id}`)
  }

  // Créer une tâche (parentTaskId optionnel pour créer une sous-tâche)
  createTask(data) {
    return http.post('/tasks', data)
  }

  // Mettre à jour une tâche
  updateTask(id, data) {
    return http.put(`/tasks/${id}`, data)
  }

  // Supprimer une tâche (supprime aussi ses sous-tâches en cascade)
  deleteTask(id) {
    return http.delete(`/tasks/${id}`)
  }
}

export default new TaskDataService()
