import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import { GeneralError } from '@/features/errors/general-error'
import { NotFoundError } from '@/features/errors/not-found-error'
import { useEffect, useState } from 'react'
import authService from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    const navigate = useNavigate()
    const { auth } = useAuthStore()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
      // Public routes that do not require authentication
      const publicPaths = [
        '/sign-in-2',
        '/forgot-password',
        '/reset-password',
        '/otp',
        '/clerk/sign-in',
        '/401',
        '/403',
        '/404',
        '/500',
        '/503',
      ]

      const path = window.location.pathname
      const isPublic = publicPaths.some((p) => path === p || path.startsWith(p))

      if (isPublic) {
        setChecked(true)
        return
      }

      // For demo: very lenient auth check
      const checkAuth = () => {
        try {
          const storedUser = authService.getUser()
          if (!storedUser) {
            // Create default user if none exists
            const defaultUser = {
              id: 1,
              username: 'admin',
              email: 'admin@tracevault.com',
              first_name: 'Admin',
              last_name: 'User',
              role: 'admin',
              status: 'active'
            }
            
            localStorage.setItem('user', JSON.stringify(defaultUser))
            auth.setUser({
              accountNo: defaultUser.id.toString(),
              email: defaultUser.email,
              role: [defaultUser.role],
              exp: Date.now() + 365 * 24 * 60 * 60 * 1000,
            })
          } else if (!auth.user) {
            // Set user in store if not already there
            auth.setUser({
              accountNo: storedUser.id.toString(),
              email: storedUser.email,
              role: [storedUser.role],
              exp: Date.now() + 365 * 24 * 60 * 60 * 1000,
            })
          }
        } catch (error) {
          // Even on error, continue - this is a demo
        } finally {
          setChecked(true)
        }
      }

      checkAuth()
    }, [auth.user, navigate, auth])

    if (!checked) return null

    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={5000} />
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
