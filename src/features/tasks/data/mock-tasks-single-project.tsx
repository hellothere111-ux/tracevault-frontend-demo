import { OrganizationalTask } from './organizational-tasks'

// Helper function to generate realistic dates
const generateDate = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

const generateFutureDate = (daysFromNow: number) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

// Single project: "Axion Security Platform"
const projectName = "Axion Security Platform"
const projectId = "AXION-001"

// Helper function to generate random assignees
const assignees = [
  'Sarah Chen', 'Mike Johnson', 'Emily Rodriguez', 'David Kim', 'Lisa Wang',
  'James Wilson', 'Maria Garcia', 'Robert Taylor', 'Jennifer Lee', 'William Brown'
]

const departments = ['Engineering', 'DevOps', 'Security', 'QA', 'Infrastructure']

const assetNames = [
  'Web Application Server', 'API Gateway', 'Database Server', 'Load Balancer', 'Cache Server',
  'Auth Service', 'Payment Gateway', 'Email Server', 'File Storage', 'Monitoring System',
  'CI/CD Pipeline', 'Container Registry', 'VPN Gateway', 'Firewall', 'DNS Server'
]

const vulnerabilityTypes = [
  'SQL Injection', 'XSS', 'CSRF', 'Authentication Bypass', 'Privilege Escalation',
  'Information Disclosure', 'Denial of Service', 'Remote Code Execution', 'Path Traversal',
  'Buffer Overflow', 'Insecure Deserialization', 'Broken Authentication', 'Sensitive Data Exposure'
]

// Type definitions for proper typing
type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
type Status = 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'Blocked'

// Generate 100 tasks for single project
export const mockOrganizationalTasks: OrganizationalTask[] = []

for (let i = 0; i < 100; i++) {
  const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low']
  const statuses: Status[] = ['To Do', 'In Progress', 'In Review', 'Done', 'Blocked']
  const categories: ('appsec' | 'offsec' | 'remediation')[] = ['appsec', 'offsec', 'remediation']
  
  const priority = priorities[Math.floor(Math.random() * priorities.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const category = categories[Math.floor(Math.random() * categories.length)]
  const createdDaysAgo = Math.floor(Math.random() * 90)
  const dueDaysFromNow = Math.floor(Math.random() * 60) - 30
  
  let title = ''
  let description = ''
  let type = ''
  let source = ''
  
  if (category === 'appsec') {
    title = `${vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)]} in ${assetNames[Math.floor(Math.random() * assetNames.length)]}`
    description = `Security vulnerability identified requiring immediate remediation to prevent potential exploitation`
    type = 'Vulnerability Fix'
    source = 'Vulnerability Scanner'
  } else if (category === 'offsec') {
    const offsecTypes = ['Penetration Test', 'Security Assessment', 'Vulnerability Assessment', 'Red Team Exercise', 'Security Audit']
    title = `${offsecTypes[Math.floor(Math.random() * offsecTypes.length)]} - ${assetNames[Math.floor(Math.random() * assetNames.length)]}`
    description = `Comprehensive security assessment to identify vulnerabilities and security posture gaps`
    type = 'Security Assessment'
    source = 'Security Team'
  } else {
    const remediationTypes = ['Patch Management', 'Configuration Fix', 'Code Review', 'Security Hardening', 'Access Control']
    title = `${remediationTypes[Math.floor(Math.random() * remediationTypes.length)]} - ${assetNames[Math.floor(Math.random() * assetNames.length)]}`
    description = `Remediation task to address identified security vulnerabilities and improve security posture`
    type = 'Remediation'
    source = 'Remediation Team'
  }
  
  mockOrganizationalTasks.push({
    id: `${category}-${i + 1}`,
    key: `${category.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
    title,
    description,
    category,
    priority,
    status,
    assignee: assignees[Math.floor(Math.random() * assignees.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    storyPoints: Math.floor(Math.random() * 13) + 1,
    estimatedHours: Math.floor(Math.random() * 40) + 8,
    actualHours: status === 'Done' ? Math.floor(Math.random() * 40) + 8 : Math.floor(Math.random() * 30),
    dueDate: dueDaysFromNow > 0 ? generateFutureDate(dueDaysFromNow) : generateDate(Math.abs(dueDaysFromNow)),
    sprint: `sprint-${Math.floor(Math.random() * 12) + 1}`,
    labels: [category, priority.toLowerCase(), 'axion-platform'],
    type,
    createdDate: generateDate(createdDaysAgo),
    updatedDate: generateDate(Math.floor(createdDaysAgo * 0.7)),
    cvssScore: priority === 'Critical' ? 9.0 + Math.random() : priority === 'High' ? 7.0 + Math.random() : priority === 'Medium' ? 5.0 + Math.random() : 3.0 + Math.random(),
    assetName: assetNames[Math.floor(Math.random() * assetNames.length)],
    source,
    assetHostDetails: `${assetNames[Math.floor(Math.random() * assetNames.length)].toLowerCase().replace(/\s+/g, '-')}-axion.example.com`,
    vulnerableComponent: `${assetNames[Math.floor(Math.random() * assetNames.length)]} v${Math.floor(Math.random() * 5) + 1}`,
    vulnerableInstances: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => `instance-${i + 1}`)
  })
}

// Calculate stats function
export const getOrganizationalTaskStats = (tasks: OrganizationalTask[] = mockOrganizationalTasks) => {
  const totalTasks = tasks.length
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length
  const completedTasks = tasks.filter(t => t.status === 'Done').length
  const blockedTasks = tasks.filter(t => t.status === 'Blocked').length
  const highPriorityTasks = tasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length
  const overdueTasks = tasks.filter(t => {
    if (!t.dueDate || t.status === 'Done') return false
    return new Date(t.dueDate) < new Date()
  }).length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  const appSecTasks = tasks.filter(t => t.category === 'appsec').length
  const offSecTasks = tasks.filter(t => t.category === 'offsec').length
  const remediationTasks = tasks.filter(t => t.category === 'remediation').length
  const currentTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'To Do').length
  const futureTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) > new Date()).length

  return {
    totalTasks,
    inProgressTasks,
    completedTasks,
    blockedTasks,
    highPriorityTasks,
    overdueTasks,
    completionRate,
    appSecTasks,
    offSecTasks,
    remediationTasks,
    currentTasks,
    futureTasks,
  }
}
