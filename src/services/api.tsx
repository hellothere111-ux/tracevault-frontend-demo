// Mock API service for Vercel deployment without backend
// This provides the same interface as the original API service but doesn't make real HTTP calls

interface MockApiResponse<T> {
  data: T
}

const api = {
  get: async function <T>(url: string): Promise<MockApiResponse<T>> {
    // Mock implementation - simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Return mock data or throw error based on URL
    if (url.includes('/api/auth/me')) {
      const userStr = localStorage.getItem('user')
      if (!userStr) {
        throw new Error('User not authenticated')
      }
      return { data: JSON.parse(userStr) as T }
    }
    
    // Default mock response
    return { data: {} as T }
  },
  
  post: async function <T>(url: string, data?: any): Promise<MockApiResponse<T>> {
    // Mock implementation - simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Handle different endpoints
    if (url.includes('/api/auth/refresh')) {
      return { 
        data: {
          access_token: `mock_access_token_${Date.now()}`,
          refresh_token: `mock_refresh_token_${Date.now()}`,
          token_type: 'bearer'
        } as T
      }
    }
    
    // Default mock response
    return { data: {} as T }
  },
  
  put: async function <T>(url: string, data?: any): Promise<MockApiResponse<T>> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { data: {} as T }
  },
  
  delete: async function <T>(url: string): Promise<MockApiResponse<T>> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { data: {} as T }
  }
}

export default api
