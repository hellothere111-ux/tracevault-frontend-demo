import api from './api'
import type {
  Tenant,
  Project,
  SubProject,
  Environment,
  AssetStats,
  CreateTenantRequest,
  CreateProjectRequest,
  CreateSubProjectRequest,
  CreateEnvironmentRequest,
} from '@/features/assets/types/asset.types'

class AssetService {
  async getStats(): Promise<AssetStats> {
    try {
      const response = await api.get<AssetStats>('/api/v1/assets/stats')
      return response.data
    } catch (error: any) {
      console.error('Failed to get asset stats:', error)
      throw error
    }
  }

  async getTenants(): Promise<Tenant[]> {
    try {
      const response = await api.get<Tenant[]>('/api/v1/tenants')
      return response.data
    } catch (error: any) {
      console.error('Failed to get tenants:', error)
      throw error
    }
  }

  async getTenant(tenantId: string): Promise<Tenant> {
    try {
      const response = await api.get<Tenant>(`/api/v1/tenants/${tenantId}`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to get tenant ${tenantId}:`, error)
      throw error
    }
  }

  async createTenant(data: CreateTenantRequest): Promise<Tenant> {
    try {
      const response = await api.post<Tenant>('/api/v1/tenants', data)
      return response.data
    } catch (error: any) {
      console.error('Failed to create tenant:', error)
      throw error
    }
  }

  async updateTenant(
    tenantId: string,
    data: Partial<CreateTenantRequest>
  ): Promise<Tenant> {
    try {
      const response = await api.patch<Tenant>(`/api/v1/tenants/${tenantId}`, data)
      return response.data
    } catch (error: any) {
      console.error(`Failed to update tenant ${tenantId}:`, error)
      throw error
    }
  }

  async deleteTenant(tenantId: string): Promise<void> {
    try {
      await api.delete(`/api/v1/tenants/${tenantId}`)
    } catch (error: any) {
      console.error(`Failed to delete tenant ${tenantId}:`, error)
      throw error
    }
  }

  async getProjects(tenantId?: string): Promise<Project[]> {
    try {
      const response = await api.get<Project[]>('/api/v1/assets', {
        params: tenantId ? { tenant_id: tenantId } : {},
      })
      return response.data
    } catch (error: any) {
      console.error('Failed to get projects:', error)
      throw error
    }
  }

  async getProject(projectId: string): Promise<Project> {
    try {
      const response = await api.get<Project>(`/api/v1/assets/${projectId}`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to get project ${projectId}:`, error)
      throw error
    }
  }

  async createProject(data: CreateProjectRequest): Promise<Project> {
    try {
      const response = await api.post<Project>('/api/v1/assets', data)
      return response.data
    } catch (error: any) {
      console.error('Failed to create project:', error)
      throw error
    }
  }

  async updateProject(
    projectId: string,
    data: Partial<CreateProjectRequest>
  ): Promise<Project> {
    try {
      const response = await api.patch<Project>(`/api/v1/assets/${projectId}`, data)
      return response.data
    } catch (error: any) {
      console.error(`Failed to update project ${projectId}:`, error)
      throw error
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      await api.delete(`/api/v1/assets/${projectId}`)
    } catch (error: any) {
      console.error(`Failed to delete project ${projectId}:`, error)
      throw error
    }
  }

  async getSubProjects(projectId: string): Promise<SubProject[]> {
    try {
      const response = await api.get<SubProject[]>(`/api/v1/assets/${projectId}/sub-projects`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to get sub-projects for ${projectId}:`, error)
      throw error
    }
  }

  async createSubProject(data: CreateSubProjectRequest): Promise<SubProject> {
    try {
      const response = await api.post<SubProject>('/api/v1/assets/sub-projects', data)
      return response.data
    } catch (error: any) {
      console.error('Failed to create sub-project:', error)
      throw error
    }
  }

  async updateSubProject(
    subProjectId: string,
    data: Partial<CreateSubProjectRequest>
  ): Promise<SubProject> {
    try {
      const response = await api.patch<SubProject>(
        `/api/v1/assets/sub-projects/${subProjectId}`,
        data
      )
      return response.data
    } catch (error: any) {
      console.error(`Failed to update sub-project ${subProjectId}:`, error)
      throw error
    }
  }

  async deleteSubProject(subProjectId: string): Promise<void> {
    try {
      await api.delete(`/api/v1/assets/sub-projects/${subProjectId}`)
    } catch (error: any) {
      console.error(`Failed to delete sub-project ${subProjectId}:`, error)
      throw error
    }
  }

  async getEnvironments(subProjectId: string): Promise<Environment[]> {
    try {
      const response = await api.get<Environment[]>(
        `/api/v1/assets/sub-projects/${subProjectId}/environments`
      )
      return response.data
    } catch (error: any) {
      console.error(`Failed to get environments for ${subProjectId}:`, error)
      throw error
    }
  }

  async createEnvironment(data: CreateEnvironmentRequest): Promise<Environment> {
    try {
      const response = await api.post<Environment>('/api/v1/assets/environments', data)
      return response.data
    } catch (error: any) {
      console.error('Failed to create environment:', error)
      throw error
    }
  }

  async updateEnvironment(
    environmentId: string,
    data: Partial<CreateEnvironmentRequest>
  ): Promise<Environment> {
    try {
      const response = await api.patch<Environment>(
        `/api/v1/assets/environments/${environmentId}`,
        data
      )
      return response.data
    } catch (error: any) {
      console.error(`Failed to update environment ${environmentId}:`, error)
      throw error
    }
  }

  async deleteEnvironment(environmentId: string): Promise<void> {
    try {
      await api.delete(`/api/v1/assets/environments/${environmentId}`)
    } catch (error: any) {
      console.error(`Failed to delete environment ${environmentId}:`, error)
      throw error
    }
  }

  async getAssetVulnerabilities(assetId: string) {
    try {
      const response = await api.get(`/api/v1/assets/${assetId}/vulnerabilities`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to get vulnerabilities for asset ${assetId}:`, error)
      throw error
    }
  }
}

export default new AssetService()