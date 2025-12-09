import { reactive } from 'vue'
import TaskDataService from './services/TaskDataService'

const store = reactive({
  tasks: [], // Tâches racines avec arbre complet
  currentParent: null, // Pour la navigation breadcrumb
  loading: false,
  error: null,

  // Charger toutes les tâches racines avec arbre complet
  async loadTasks() {
    this.loading = true
    this.error = null
    try {
      const response = await TaskDataService.getAllTasks()
      this.tasks = response.data
      return this.tasks
    } catch (err) {
      this.error = err.message
      return []
    } finally {
      this.loading = false
    }
  },

  // Créer une nouvelle tâche
  async createTask(taskData, parentTaskId = null) {
    try {
      const response = await TaskDataService.createTask({
        ...taskData,
        parentTaskId
      })

      const newTask = response.data
      newTask.subtasks = []

      if (parentTaskId === null) {
        // Tâche racine
        this.tasks.push(newTask)
      } else {
        // Sous-tâche : l'ajouter dans l'arbre
        const parent = this.findTaskById(parentTaskId, this.tasks)
        if (parent) {
          if (!parent.subtasks) parent.subtasks = []
          parent.subtasks.push(newTask)
        }
      }

      return newTask
    } catch (err) {
      this.error = err.message
      throw err
    }
  },

  // Mettre à jour une tâche
  async updateTask(taskId, data) {
    try {
      const response = await TaskDataService.updateTask(taskId, data)

      // Mettre à jour dans l'arbre local
      const task = this.findTaskById(taskId, this.tasks)
      if (task) {
        Object.assign(task, response.data)
      }

      return response.data
    } catch (err) {
      this.error = err.message
      throw err
    }
  },

  // Supprimer une tâche
  async deleteTask(taskId) {
    try {
      await TaskDataService.deleteTask(taskId)

      // Retirer de l'arbre local
      this.removeTaskFromTree(taskId, this.tasks)
    } catch (err) {
      this.error = err.message
      throw err
    }
  },

  // Fonction récursive pour trouver une tâche par ID dans l'arbre
  findTaskById(taskId, tasks) {
    for (const task of tasks) {
      if (task.id === taskId) {
        return task
      }
      if (task.subtasks && task.subtasks.length > 0) {
        const found = this.findTaskById(taskId, task.subtasks)
        if (found) return found
      }
    }
    return null
  },

  // Fonction récursive pour retirer une tâche de l'arbre
  removeTaskFromTree(taskId, tasks) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        tasks.splice(i, 1)
        return true
      }
      if (tasks[i].subtasks && tasks[i].subtasks.length > 0) {
        if (this.removeTaskFromTree(taskId, tasks[i].subtasks)) {
          return true
        }
      }
    }
    return false
  },

  // Obtenir les tâches à afficher (racines ou enfants d'un parent)
  getCurrentTasks() {
    if (this.currentParent === null) {
      return this.tasks
    }
    const parent = this.findTaskById(this.currentParent, this.tasks)
    return parent ? parent.subtasks : []
  },

  // Obtenir le chemin breadcrumb
  getBreadcrumbs() {
    if (this.currentParent === null) {
      return [{ id: null, name: 'My Tasks' }]
    }

    const breadcrumbs = [{ id: null, name: 'My Tasks' }]
    const path = this.getTaskPath(this.currentParent, this.tasks)

    path.forEach(task => {
      breadcrumbs.push({ id: task.id, name: task.name })
    })

    return breadcrumbs
  },

  // Obtenir le chemin complet vers une tâche
  getTaskPath(taskId, tasks, path = []) {
    for (const task of tasks) {
      if (task.id === taskId) {
        return [...path, task]
      }
      if (task.subtasks && task.subtasks.length > 0) {
        const found = this.getTaskPath(taskId, task.subtasks, [...path, task])
        if (found) return found
      }
    }
    return null
  },

  // Naviguer vers un parent (pour breadcrumbs)
  navigateToParent(parentId) {
    this.currentParent = parentId
  }
})

export default store
