// Task data constants for routing and forms
export const statuses = [
  { value: 'To Do', label: 'To Do' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'In Review', label: 'In Review' },
  { value: 'Done', label: 'Done' },
  { value: 'Blocked', label: 'Blocked' },
] as const

export const priorities = [
  { value: 'Critical', label: 'Critical' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
] as const

export const categories = [
  { value: 'appsec', label: 'AppSec' },
  { value: 'offsec', label: 'OffSec' },
  { value: 'remediation', label: 'Remediation' },
  { value: 'current', label: 'Current' },
] as const

export const taskTypes = [
  { value: 'Vulnerability Fix', label: 'Vulnerability Fix' },
  { value: 'Patch Management', label: 'Patch Management' },
  { value: 'Security Implementation', label: 'Security Implementation' },
  { value: 'Security Configuration', label: 'Security Configuration' },
  { value: 'Vulnerability Remediation', label: 'Vulnerability Remediation' },
] as const

// Common labels for tasks
export const commonLabels = [
  'remediation',
  'fix',
  'patch',
  'vulnerability',
  'vapt',
  'project',
  'tenant',
  'critical',
  'security',
  'framework',
  'ssl',
  'automation',
  'certificates',
] as const

// Default values for forms
export const defaultTaskValues = {
  status: 'To Do',
  priority: 'Medium',
  category: 'remediation',
  type: 'Vulnerability Fix',
} as const

// Validation helpers
export const isValidStatus = (status: string): status is typeof statuses[number]['value'] => {
  return statuses.some(s => s.value === status)
}

export const isValidPriority = (priority: string): priority is typeof priorities[number]['value'] => {
  return priorities.some(p => p.value === priority)
}

export const isValidCategory = (category: string): category is typeof categories[number]['value'] => {
  return categories.some(c => c.value === category)
}
