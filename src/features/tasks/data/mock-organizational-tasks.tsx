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

// Helper function to generate random assignees
const assignees = [
  'Sarah Chen', 'Mike Johnson', 'Emily Rodriguez', 'David Kim', 'Lisa Wang',
  'James Wilson', 'Maria Garcia', 'Robert Taylor', 'Jennifer Lee', 'William Brown',
  'Amanda Martinez', 'Christopher Anderson', 'Jessica Thomas', 'Daniel White', 'Ashley Harris'
]

const departments = ['Engineering', 'DevOps', 'Security', 'QA', 'Infrastructure', 'Product']

const assetNames = [
  'Web Application Server', 'API Gateway', 'Database Server', 'Load Balancer', 'Cache Server',
  'Auth Service', 'Payment Gateway', 'Email Server', 'File Storage', 'Monitoring System',
  'CI/CD Pipeline', 'Container Registry', 'VPN Gateway', 'Firewall', 'DNS Server',
  'Backup Server', 'Log Management', 'SIEM System', 'Vulnerability Scanner'
]

const vulnerabilityTypes = [
  'SQL Injection', 'XSS', 'CSRF', 'Authentication Bypass', 'Privilege Escalation',
  'Information Disclosure', 'Denial of Service', 'Remote Code Execution', 'Path Traversal',
  'Buffer Overflow', 'Insecure Deserialization', 'Broken Authentication', 'Sensitive Data Exposure'
]

// Type definitions for proper typing
type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
type Status = 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'Blocked'

// Generate realistic AppSec tasks
const generateAppSecTasks = (): OrganizationalTask[] => {
  const tasks: OrganizationalTask[] = []
  const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low']
  const statuses: Status[] = ['To Do', 'In Progress', 'In Review', 'Done', 'Blocked']
  
  for (let i = 0; i < 150; i++) {
    const priority = priorities[Math.floor(Math.random() * priorities.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const createdDaysAgo = Math.floor(Math.random() * 90)
    const dueDaysFromNow = Math.floor(Math.random() * 60) - 30
    
    tasks.push({
      id: `appsec-${i + 1}`,
      key: `APP-${String(i + 1).padStart(3, '0')}`,
      title: `${vulnerabilityTypes[Math.floor(Math.random() * vulnerabilityTypes.length)]} in ${assetNames[Math.floor(Math.random() * assetNames.length)]}`,
      description: `Security vulnerability identified requiring immediate remediation to prevent potential exploitation`,
      category: 'appsec',
      priority,
      status,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      storyPoints: Math.floor(Math.random() * 13) + 1,
      estimatedHours: Math.floor(Math.random() * 40) + 8,
      actualHours: status === 'Done' ? Math.floor(Math.random() * 40) + 8 : Math.floor(Math.random() * 30),
      dueDate: dueDaysFromNow > 0 ? generateFutureDate(dueDaysFromNow) : generateDate(Math.abs(dueDaysFromNow)),
      sprint: `sprint-${Math.floor(Math.random() * 12) + 1}`,
      labels: ['vulnerability', 'security', priority.toLowerCase(), 'appsec'],
      type: 'Vulnerability Fix',
      createdDate: generateDate(createdDaysAgo),
      updatedDate: generateDate(Math.floor(createdDaysAgo * 0.7)),
      cvssScore: priority === 'Critical' ? 9.0 + Math.random() : priority === 'High' ? 7.0 + Math.random() : priority === 'Medium' ? 5.0 + Math.random() : 3.0 + Math.random(),
      assetName: assetNames[Math.floor(Math.random() * assetNames.length)],
      source: 'Vulnerability Scanner',
      assetHostDetails: `${assetNames[Math.floor(Math.random() * assetNames.length)].toLowerCase().replace(/\s+/g, '-')}-prod.example.com`,
      vulnerableComponent: `${assetNames[Math.floor(Math.random() * assetNames.length)]} v${Math.floor(Math.random() * 5) + 1}`,
      vulnerableInstances: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => `instance-${i + 1}`)
    })
  }
  
  return tasks
}

// Generate realistic OffSec tasks
const generateOffSecTasks = (): OrganizationalTask[] => {
  const tasks: OrganizationalTask[] = []
  const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low']
  const statuses: Status[] = ['To Do', 'In Progress', 'In Review', 'Done', 'Blocked']
  const offsecTypes = ['Penetration Test', 'Security Assessment', 'Vulnerability Assessment', 'Red Team Exercise', 'Security Audit']
  
  for (let i = 0; i < 80; i++) {
    const priority = priorities[Math.floor(Math.random() * priorities.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const createdDaysAgo = Math.floor(Math.random() * 90)
    const dueDaysFromNow = Math.floor(Math.random() * 45) - 15
    
    tasks.push({
      id: `offsec-${i + 1}`,
      key: `OFF-${String(i + 1).padStart(3, '0')}`,
      title: `${offsecTypes[Math.floor(Math.random() * offsecTypes.length)]} - ${assetNames[Math.floor(Math.random() * assetNames.length)]}`,
      description: `Comprehensive security assessment to identify vulnerabilities and security posture gaps`,
      category: 'offsec',
      priority,
      status,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      department: 'Security',
      storyPoints: Math.floor(Math.random() * 20) + 5,
      estimatedHours: Math.floor(Math.random() * 60) + 20,
      actualHours: status === 'Done' ? Math.floor(Math.random() * 60) + 20 : Math.floor(Math.random() * 40),
      dueDate: dueDaysFromNow > 0 ? generateFutureDate(dueDaysFromNow) : generateDate(Math.abs(dueDaysFromNow)),
      sprint: `sprint-${Math.floor(Math.random() * 12) + 1}`,
      labels: ['assessment', 'offsec', priority.toLowerCase(), 'security'],
      type: 'Security Assessment',
      createdDate: generateDate(createdDaysAgo),
      updatedDate: generateDate(Math.floor(createdDaysAgo * 0.8)),
      cvssScore: priority === 'Critical' ? 8.5 + Math.random() : priority === 'High' ? 6.5 + Math.random() : priority === 'Medium' ? 4.5 + Math.random() : 2.5 + Math.random(),
      assetName: assetNames[Math.floor(Math.random() * assetNames.length)],
      source: 'Security Team',
      assetHostDetails: `${assetNames[Math.floor(Math.random() * assetNames.length)].toLowerCase().replace(/\s+/g, '-')}-prod.example.com`,
      vulnerableComponent: `${assetNames[Math.floor(Math.random() * assetNames.length)]} infrastructure`,
      vulnerableInstances: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => `finding-${i + 1}`)
    })
  }
  
  return tasks
}

// Generate realistic Remediation tasks
const generateRemediationTasks = (): OrganizationalTask[] => {
  const tasks: OrganizationalTask[] = []
  const priorities: Priority[] = ['Critical', 'High', 'Medium', 'Low']
  const statuses: Status[] = ['To Do', 'In Progress', 'In Review', 'Done', 'Blocked']
  const remediationTypes = ['Patch Management', 'Configuration Fix', 'Code Review', 'Security Hardening', 'Access Control']
  
  for (let i = 0; i < 120; i++) {
    const priority = priorities[Math.floor(Math.random() * priorities.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const createdDaysAgo = Math.floor(Math.random() * 60)
    const dueDaysFromNow = Math.floor(Math.random() * 30) - 10
    
    tasks.push({
      id: `rem-${i + 1}`,
      key: `REM-${String(i + 1).padStart(3, '0')}`,
      title: `${remediationTypes[Math.floor(Math.random() * remediationTypes.length)]} - ${assetNames[Math.floor(Math.random() * assetNames.length)]}`,
      description: `Remediation task to address identified security vulnerabilities and improve security posture`,
      category: 'remediation',
      priority,
      status,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      storyPoints: Math.floor(Math.random() * 8) + 2,
      estimatedHours: Math.floor(Math.random() * 24) + 4,
      actualHours: status === 'Done' ? Math.floor(Math.random() * 24) + 4 : Math.floor(Math.random() * 16),
      dueDate: dueDaysFromNow > 0 ? generateFutureDate(dueDaysFromNow) : generateDate(Math.abs(dueDaysFromNow)),
      sprint: `sprint-${Math.floor(Math.random() * 12) + 1}`,
      labels: ['remediation', priority.toLowerCase(), 'fix'],
      type: 'Remediation',
      createdDate: generateDate(createdDaysAgo),
      updatedDate: generateDate(Math.floor(createdDaysAgo * 0.6)),
      cvssScore: priority === 'Critical' ? 8.0 + Math.random() : priority === 'High' ? 6.0 + Math.random() : priority === 'Medium' ? 4.0 + Math.random() : 2.0 + Math.random(),
      assetName: assetNames[Math.floor(Math.random() * assetNames.length)],
      source: 'Remediation Team',
      assetHostDetails: `${assetNames[Math.floor(Math.random() * assetNames.length)].toLowerCase().replace(/\s+/g, '-')}-prod.example.com`,
      vulnerableComponent: `${assetNames[Math.floor(Math.random() * assetNames.length)]} system`,
      vulnerableInstances: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, i) => `item-${i + 1}`)
    })
  }
  
  return tasks
}

// Combine all tasks
export const mockOrganizationalTasks: OrganizationalTask[] = [
  ...generateAppSecTasks(),
  ...generateOffSecTasks(),
  ...generateRemediationTasks()
]

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
