import { OrganizationalTask } from '../data/organizational-tasks'

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': 
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'High': 
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'Medium': 
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'Low': 
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default: 
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'To Do': 
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    case 'In Progress': 
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'In Review': 
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'Done': 
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'Blocked': 
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default: 
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export const formatTaskType = (type?: string) => {
  if (!type) return 'General Task'
  return type.replace(/([A-Z])/g, ' $1').trim()
}

export const isTaskOverdue = (task: OrganizationalTask) => {
  if (!task.dueDate || task.status === 'Done') return false
  return new Date(task.dueDate) < new Date()
}

export const getDaysUntilDue = (task: OrganizationalTask) => {
  if (!task.dueDate) return null
  const dueDate = new Date(task.dueDate)
  const today = new Date()
  const diffTime = dueDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const filterRemediationTasks = (tasks: OrganizationalTask[], category: 'appsec' | 'offsec') => {
  const categoryTasks = tasks.filter(task => task.category === category)
  
  return categoryTasks.filter(task => 
    task.type?.includes('Vulnerability Fix') || 
    task.type?.includes('Patch Management') || 
    task.type?.includes('Security Implementation') ||
    task.type?.includes('Security Configuration') ||
    task.labels?.some(label => 
      label.includes('remediation') || 
      label.includes('fix') || 
      label.includes('patch') || 
      label.includes('vulnerability') || 
      (category === 'offsec' && label.includes('vapt'))
    )
  )
}

export const TASK_CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  PRIORITY_ORDER: { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 },
  STATUS_ORDER: { 'To Do': 1, 'In Progress': 2, 'In Review': 3, 'Done': 4, 'Blocked': 5 },
} as const
