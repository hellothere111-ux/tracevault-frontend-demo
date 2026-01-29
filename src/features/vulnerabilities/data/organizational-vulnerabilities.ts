export interface Vulnerability {
  id: string
  key: string
  title: string
  description: string
  category: 'appsec' | 'offsec'
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In Progress' | 'Fixed' | 'Accepted' | 'False Positive'
  cvssScore: number
  source: string
  sourceLabel: string
  asset: string
  assetType: string
  project: string
  assignee?: string
  createdDate: string
  updatedDate: string
  dueDate: string
  cveId?: string
  riskScore: number
  affectedComponent: string
  remediation: string
  references: string[]
  tags: string[]
}
