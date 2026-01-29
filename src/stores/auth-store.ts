import { create } from 'zustand'

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    reset: () => void
    // Tokens are stored in HttpOnly cookies; do not expose them to JS
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  return {
    auth: {
      user: null,
      setUser: (user) => set((state) => ({ ...state, auth: { ...state.auth, user } })),
      reset: () => set((state) => ({ ...state, auth: { ...state.auth, user: null } })),
    },
  }
})
