import { reactive } from 'vue'
import tache from './tache.json';

const store = reactive({
  _nextId: 1,
  sidebarTasks: [],
  columns: tache,
  createTask(title, priority = 'medium') {
    const t = { id: this._nextId++, name: title  ||'New Task', done: false, priority }
    this.sidebarTasks.push(t)
    return t
  },
  addTaskToColumn(columnId, title, priority = 'medium') {
    const t = { id: this._nextId++, name: title || 'New Task', done: false, priority }
    const c = this.columns.find(c => c.id === columnId)
    if (c) c.tasks.push(t)
    return t
  },
  removeSidebarTask(id) {
    const idx = this.sidebarTasks.findIndex(t => t.id === id)
    if (idx !== -1) this.sidebarTasks.splice(idx, 1)
  },
  updateSidebarTask(id, data) {
    const t = this.sidebarTasks.find(t => t.id === id)
    if (t) Object.assign(t, data)
  }
  ,
  addColumn(name) {
    const col = { id: this._nextId++, name: name || 'New column', tasks: [] }
    this.columns.push(col)
    return col
  },
  removeColumn(id) {
    const idx = this.columns.findIndex(c => c.id === id)
    if (idx !== -1) this.columns.splice(idx, 1)
  },
  updateColumn(id, data) {
    const c = this.columns.find(c => c.id === id)
    if (c) Object.assign(c, data)
  }
})

export default store