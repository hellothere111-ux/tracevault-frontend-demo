// Mock user database for demo purposes
const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@tracevault.com',
    password: 'admin123',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    username: 'manager',
    email: 'manager@tracevault.com',
    password: 'manager123',
    first_name: 'Manager',
    last_name: 'User',
    role: 'manager',
    status: 'active'
  },
  {
    id: 3,
    username: 'analyst',
    email: 'analyst@tracevault.com',
    password: 'analyst123',
    first_name: 'Analyst',
    last_name: 'User',
    role: 'analyst',
    status: 'active'
  }
]

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    role: string
    status: string
  }
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface UserResponse {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
  status: string
  created_at: string
  updated_at: string
}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}

export interface ForgotPasswordResponse {
  status: string
  message: string
}

export interface ResetPasswordResponse {
  status: string
  message: string
}

class AuthService {
  /**
   * Login with email and password (mock implementation)
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Find user in mock database
    const user = MOCK_USERS.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }
    
    // Generate mock tokens
    const access_token = `mock_access_token_${Date.now()}`
    const refresh_token = `mock_refresh_token_${Date.now()}`
    
    // Store user session in localStorage for demo
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      status: user.status
    }))
    
    return {
      access_token,
      refresh_token,
      token_type: 'bearer',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        status: user.status
      }
    }
  }

  /**
   * Logout - clear stored tokens and cookies
   */
  async logout(): Promise<void> {
    localStorage.removeItem('user')
  }

  /**
   * Get current user info (mock implementation)
   */
  async getCurrentUser(): Promise<UserResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      throw new Error('User not authenticated')
    }
    
    const user = JSON.parse(userStr)
    
    return {
      ...user,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }

  /**
   * Change password (mock implementation)
   */
  async changePassword(_currentPassword: string, _newPassword: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      throw new Error('User not authenticated')
    }
    
    // Mock password change logic
    console.log('Password changed successfully (mock)')
  }

  /**
   * Request password reset (forgot password) - mock implementation
   */
  async forgotPassword(_email: string): Promise<ForgotPasswordResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      status: 'success',
      message: 'Password reset email sent (mock)'
    }
  }

  /**
   * Reset password with token from email - mock implementation
   */
  async resetPassword(_token: string, _newPassword: string): Promise<ResetPasswordResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      status: 'success',
      message: 'Password reset successfully (mock)'
    }
  }

  /**
   * Get CSRF token - mock implementation
   */
  async getCSRFToken(): Promise<string> {
    return `mock_csrf_token_${Date.now()}`
  }

  /**
   * Refresh access token - mock implementation
   */
  async refreshToken(): Promise<TokenResponse> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      access_token: `mock_access_token_${Date.now()}`,
      refresh_token: `mock_refresh_token_${Date.now()}`,
      token_type: 'bearer'
    }
  }

  /**
   * Check if user is authenticated (mock implementation)
   */
  isAuthenticated(): boolean {
    const user = localStorage.getItem('user')
    return !!user
  }

  /**
   * Get stored access token (mock implementation)
   */
  getToken(): string | null {
    return `mock_access_token_${Date.now()}`
  }

  /**
   * Get stored user info
   */
  getUser(): any {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}

export default new AuthService()
