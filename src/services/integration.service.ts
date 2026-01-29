/**
 * Integration API Service
 * Handles communication with backend for Snyk and Jira integration
 */

import api from './api'

export interface IntegrationConfig {
  provider: string
  config: Record<string, any>
}

export interface IntegrationStatus {
  provider: string
  connected: boolean
  last_sync?: string
  error?: string
}

export interface IntegrationError {
  code: string
  message: string
  details?: any
}

class IntegrationService {
  /**
   * Configure integration with credentials
   */
  async configureIntegration(provider: string, config: Record<string, any>) {
    try {
      const response = await api.post(`/api/v1/integrations/${provider}`, config)
      return response.data
    } catch (error: any) {
      console.error(`Failed to configure ${provider} integration:`, error)
      throw error
    }
  }

  /**
   * Test integration connection
   */
  async testConnection(provider: string) {
    try {
      const response = await api.post(`/api/v1/integrations/${provider}/test`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to test ${provider} connection:`, error)
      throw error
    }
  }

  /**
   * Get all integrations
   */
  async getIntegrations() {
    try {
      const response = await api.get('/api/v1/integrations')
      return response.data
    } catch (error: any) {
      console.error('Failed to get integrations:', error)
      throw error
    }
  }

  /**
   * Get integration by provider
   */
  async getIntegration(provider: string) {
    try {
      const response = await api.get(`/api/v1/integrations/${provider}`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to get ${provider} integration:`, error)
      throw error
    }
  }

  /**
   * Update integration
   */
  async updateIntegration(provider: string, config: Record<string, any>) {
    try {
      const response = await api.patch(`/api/v1/integrations/${provider}`, config)
      return response.data
    } catch (error: any) {
      console.error(`Failed to update ${provider} integration:`, error)
      throw error
    }
  }

  /**
   * Delete integration
   */
  async deleteIntegration(provider: string) {
    try {
      await api.delete(`/api/v1/integrations/${provider}`)
    } catch (error: any) {
      console.error(`Failed to delete ${provider} integration:`, error)
      throw error
    }
  }

  /**
   * Trigger sync for integration
   */
  async triggerSync(provider: string) {
    try {
      const response = await api.post(`/api/v1/integrations/${provider}/sync`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to trigger sync for ${provider}:`, error)
      throw error
    }
  }

  /**
   * Get integration status
   */
  async getStatus(provider: string) {
    try {
      const response = await api.get(`/api/v1/integrations/${provider}/status`)
      return response.data
    } catch (error: any) {
      console.error(`Failed to get ${provider} status:`, error)
      throw error
    }
  }
}

export default new IntegrationService()
