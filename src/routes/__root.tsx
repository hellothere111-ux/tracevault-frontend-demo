import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
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

      // Quick check: if user is not in store, redirect immediately
      if (!auth.user) {
        navigate({ to: '/sign-in-2', replace: true })
        setChecked(true)
        return
      }

      let mounted = true
      const verify = async () => {
        try {
          await authService.getCurrentUser()
          if (!mounted) return
        } catch (e) {
          if (!mounted) return
          const redirect = window.location.pathname + window.location.search
          navigate({ to: '/sign-in-2', search: { redirect }, replace: true })
        } finally {
          if (mounted) setChecked(true)
        }
      }

      verify()

      return () => {
        mounted = false
      }
    }, [auth.user, navigate])

    if (!checked) return null

    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={5000} />
        {import.meta.env.MODE === 'development' && (
          <>
            <ReactQueryDevtools buttonPosition='bottom-left' />
            <TanStackRouterDevtools position='bottom-right' />
          </>
        )}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
