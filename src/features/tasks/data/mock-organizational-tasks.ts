import { OrganizationalTask } from './organizational-tasks'

export const mockOrganizationalTasks: OrganizationalTask[] = [
  // AppSec Tasks
  {
    id: 'task-1',
    key: 'APP-001',
    title: 'Update Apache Struts to latest version',
    description: 'Upgrade Apache Struts framework to address critical vulnerabilities',
    category: 'appsec',
    priority: 'Critical',
    status: 'In Progress',
    assignee: 'Sarah Chen',
    department: 'Engineering',
    storyPoints: 8,
    estimatedHours: 24,
    actualHours: 12,
    dueDate: '2026-01-30',
    sprint: 'sprint-1',
    labels: ['patch', 'framework', 'critical'],
    type: 'Vulnerability Fix',
    createdDate: '2026-01-15',
    updatedDate: '2026-01-20',
    cvssScore: 9.8,
    assetName: 'Web Application Server',
    source: 'Vulnerability Scanner',
    assetHostDetails: 'web-prod-01.example.com',
    vulnerableComponent: 'Apache Struts 2.5.30',
    vulnerableInstances: ['web-prod-01', 'web-prod-02', 'web-staging-01']
  },
  {
    id: 'task-2',
    key: 'APP-002',
    title: 'Implement SSL/TLS certificate renewal automation',
    description: 'Automate SSL certificate renewal process to prevent expirations',
    category: 'appsec',
    priority: 'High',
    status: 'In Review',
    assignee: 'Mike Johnson',
    department: 'DevOps',
    storyPoints: 5,
    estimatedHours: 16,
    actualHours: 14,
    dueDate: '2026-02-05',
    sprint: 'sprint-1',
    labels: ['ssl', 'automation', 'certificates'],
    type: 'Security Implementation',
    createdDate: '2026-01-10',
    updatedDate: '2026-01-22',
    cvssScore: 7.5,
    assetName: 'Load Balancer',
    source: 'Manual Review',
    assetHostDetails: 'lb-01.example.com',
    vulnerableComponent: 'SSL Certificate Management',
    vulnerableInstances: ['lb-01', 'lb-02']
  },
  {
    id: 'task-3',
    key: 'APP-003',
    title: 'Fix SQL injection in user authentication module',
    description: 'Address SQL injection vulnerability found in authentication service',
    category: 'appsec',
    priority: 'Critical',
    status: 'To Do',
    assignee: 'Emily Davis',
    department: 'Engineering',
    storyPoints: 13,
    estimatedHours: 32,
    actualHours: 0,
    dueDate: '2026-01-25',
    sprint: 'sprint-2',
    labels: ['sql-injection', 'auth', 'critical'],
    type: 'Vulnerability Fix',
    createdDate: '2026-01-18',
    updatedDate: '2026-01-18',
    cvssScore: 10.0,
    assetName: 'Authentication Service',
    source: 'Penetration Test',
    assetHostDetails: 'auth-api.example.com',
    vulnerableComponent: 'User Authentication Module',
    vulnerableInstances: ['auth-api-01', 'auth-api-02']
  },
  
  // OffSec Tasks
  {
    id: 'task-4',
    key: 'OFF-001',
    title: 'Conduct external network penetration testing',
    description: 'Perform comprehensive external network security assessment',
    category: 'offsec',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Alex Thompson',
    department: 'Security',
    storyPoints: 21,
    estimatedHours: 40,
    actualHours: 15,
    dueDate: '2026-02-10',
    sprint: 'sprint-1',
    labels: ['pentest', 'network', 'external'],
    type: 'Penetration Testing',
    createdDate: '2026-01-12',
    updatedDate: '2026-01-21',
    cvssScore: 8.5,
    assetName: 'Corporate Network',
    source: 'Security Audit',
    assetHostDetails: 'corporate-network.example.com',
    vulnerableComponent: 'External Firewall',
    vulnerableInstances: ['firewall-01', 'firewall-02']
  },
  {
    id: 'task-5',
    key: 'OFF-002',
    title: 'Perform social engineering assessment',
    description: 'Evaluate employee security awareness through simulated attacks',
    category: 'offsec',
    priority: 'Medium',
    status: 'To Do',
    assignee: 'Lisa Wang',
    department: 'Security',
    storyPoints: 8,
    estimatedHours: 20,
    actualHours: 0,
    dueDate: '2026-02-15',
    sprint: 'sprint-2',
    labels: ['social-engineering', 'awareness', 'training'],
    type: 'Security Assessment',
    createdDate: '2026-01-20',
    updatedDate: '2026-01-20',
    cvssScore: 5.0,
    assetName: 'Human Resources',
    source: 'Compliance Requirement',
    assetHostDetails: 'All Departments',
    vulnerableComponent: 'Employee Security Awareness',
    vulnerableInstances: ['HR', 'Finance', 'Engineering']
  },
  
  // Additional tasks for variety
  {
    id: 'task-6',
    key: 'APP-004',
    title: 'Configure CORS policy for API endpoints',
    description: 'Implement proper CORS configuration for all API endpoints',
    category: 'appsec',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'David Kim',
    department: 'Backend',
    storyPoints: 3,
    estimatedHours: 12,
    actualHours: 6,
    dueDate: '2026-01-28',
    sprint: 'sprint-1',
    labels: ['cors', 'api', 'configuration'],
    type: 'Security Configuration',
    createdDate: '2026-01-16',
    updatedDate: '2026-01-19',
    cvssScore: 4.5,
    assetName: 'API Gateway',
    source: 'Code Review',
    assetHostDetails: 'api-gateway.example.com',
    vulnerableComponent: 'CORS Configuration',
    vulnerableInstances: ['api-gateway-01']
  },
  {
    id: 'task-7',
    key: 'OFF-003',
    title: 'Review and update incident response procedures',
    description: 'Update incident response playbooks and conduct tabletop exercises',
    category: 'offsec',
    priority: 'High',
    status: 'Done',
    assignee: 'James Wilson',
    department: 'Security Operations',
    storyPoints: 5,
    estimatedHours: 16,
    actualHours: 18,
    dueDate: '2026-01-15',
    sprint: 'sprint-1',
    labels: ['incident-response', 'procedures', 'documentation'],
    type: 'Security Documentation',
    createdDate: '2026-01-05',
    updatedDate: '2026-01-14',
    cvssScore: 3.0,
    assetName: 'Security Operations Center',
    source: 'Internal Audit',
    assetHostDetails: 'soc.example.com',
    vulnerableComponent: 'Incident Response Procedures',
    vulnerableInstances: ['SOC-01']
  }
]

export const getTasksByCategory = (category: string) => {
  return mockOrganizationalTasks.filter(task => task.category === category)
}

export const getTaskById = (id: string) => {
  return mockOrganizationalTasks.find(task => task.id === id)
}

export const getTasksByAssignee = (assignee: string) => {
  return mockOrganizationalTasks.filter(task => task.assignee === assignee)
}

export const getOverdueTasks = () => {
  const today = new Date()
  return mockOrganizationalTasks.filter(task => {
    if (!task.dueDate || task.status === 'Done') return false
    return new Date(task.dueDate) < today
  })
}

export const getTasksByPriority = (priority: string) => {
  return mockOrganizationalTasks.filter(task => task.priority === priority)
}

export const getTasksByStatus = (status: string) => {
  return mockOrganizationalTasks.filter(task => task.status === status)
}

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
  const currentTasks = tasks.filter(t => t.category === 'current').length
  const futureTasks = tasks.filter(t => t.isFuture === true).length

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
