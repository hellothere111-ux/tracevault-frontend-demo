export interface VulnerabilityInstance {
  location: string
  file: string
  lineNumber: number
  codeSnippet: string
  type: string
}

export interface LinkedVulnerability {
  id: string
  name: string
  severity: string
}

export interface OrganizationalTask {
  id: string
  key: string
  title: string
  description?: string
  category: 'appsec' | 'offsec' | 'remediation' | 'current'
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'Blocked'
  assignee?: string
  assigneeAvatar?: string
  department?: string
  storyPoints?: number
  estimatedHours?: number
  actualHours?: number
  dueDate?: string
  sprint?: string
  labels?: string[]
  linkedVulnerability?: LinkedVulnerability
  instances?: VulnerabilityInstance[]
  type?: string
  isFuture?: boolean
  createdDate: string
  updatedDate: string
  cvssScore?: number
  assetName?: string
  projectName?: string
  source?: string
  assetHostDetails?: string
  vulnerableComponent?: string
  vulnerableInstances?: string[]
}

export interface Sprint {
  id: string
  name: string
  state: 'active' | 'closed' | 'future'
  startDate?: string
  endDate?: string
  goal?: string
}

export interface TaskStats {
  totalTasks: number
  inProgressTasks: number
  completedTasks: number
  blockedTasks: number
  highPriorityTasks: number
  overdueTasks: number
  completionRate: number
  appSecTasks: number
  offSecTasks: number
  remediationTasks: number
  currentTasks: number
  futureTasks: number
}
