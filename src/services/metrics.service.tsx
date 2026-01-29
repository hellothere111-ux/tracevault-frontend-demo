import api from './api'

export interface MTTRMetric {
  days: number
  trend: number
}

export interface RemediationRate {
  percentage: number
  fixed: number
  discovered: number
}

class MetricsService {
  async getMTTR(): Promise<MTTRMetric> {
    try {
      const response = await api.get<MTTRMetric>('/api/v1/metrics/mttr')
      return response.data
    } catch (error: any) {
      console.error('Failed to get MTTR metric:', error)
      throw error
    }
  }

  async getMTTRTrend(days: number = 30) {
    try {
      const response = await api.get('/api/v1/metrics/mttr/trend', {
        params: { days },
      })
      return response.data
    } catch (error: any) {
      console.error('Failed to get MTTR trend:', error)
      throw error
    }
  }

  async getRemediationRate(): Promise<RemediationRate> {
    try {
      const response = await api.get<RemediationRate>('/api/v1/metrics/remediation-rate')
      return response.data
    } catch (error: any) {
      console.error('Failed to get remediation rate:', error)
      throw error
    }
  }
}

export default new MetricsService()