// ===== ENUMS =====
export enum AssetType {
  TENANT = 'tenant',
  PROJECT = 'project',
  SUB_PROJECT = 'sub_project',
  ENVIRONMENT = 'environment',
}

export enum EnvironmentType {
  DEV = 'dev',
  STAGING = 'staging',
  PRODUCTION = 'production',
  UAT = 'uat',
  QA = 'qa',
}

// ===== INTERFACES =====
export interface Environment {
  id: string
  name: string
  type: EnvironmentType
  description?: string
  url?: string
  status: 'active' | 'inactive' | 'maintenance'
  created_at: string
  updated_at: string
  vulnerabilities_count: number
  risk_score: number
}

export interface SubProject {
  id: string
  name: string
  description?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  environments: Environment[]
  vulnerabilities_count: number
  risk_score: number
}

export interface Project {
  id: string
  name: string
  description?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  sub_projects: SubProject[]
  vulnerabilities_count: number
  risk_score: number
}

export interface Tenant {
  id: string
  name: string
  description?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  projects: Project[]
  vulnerabilities_count: number
  risk_score: number
}

export interface AssetTreeNode {
  id: string
  name: string
  type: AssetType
  level: number
  parent_id?: string
  children: AssetTreeNode[]
  data: Tenant | Project | SubProject | Environment
  expanded?: boolean
  selected?: boolean
}

export interface AssetStats {
  total_assets: number
  total_tenants: number
  total_projects: number
  total_environments: number
  total_vulnerabilities: number
  critical_vulns: number
  high_vulns: number
}

export interface CreateTenantRequest {
  name: string
  description?: string
}

export interface CreateProjectRequest {
  tenant_id: string
  name: string
  description?: string
}

export interface CreateSubProjectRequest {
  project_id: string
  name: string
  description?: string
}

export interface CreateEnvironmentRequest {
  sub_project_id: string
  name: string
  type: EnvironmentType
  url?: string
  description?: string
}