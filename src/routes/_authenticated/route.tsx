import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { useEffect, useState } from 'react'
import authService from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated')({
  component: () => {
    const navigate = useNavigate()
    const { auth } = useAuthStore()
    const [checked, setChecked] = useState(false)
    const [authed, setAuthed] = useState(false)

    useEffect(() => {
      // For demo: always try to get user from localStorage first
      const checkAuth = async () => {
        try {
          // Check if user exists in localStorage
          const storedUser = authService.getUser()
          if (storedUser) {
            // Set user in store if not already there
            if (!auth.user) {
              auth.setUser({
                accountNo: storedUser.id.toString(),
                email: storedUser.email,
                role: [storedUser.role],
                exp: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year for demo
              })
            }
            setAuthed(true)
          } else {
            // No user in localStorage, redirect to sign-in
            navigate({ to: '/sign-in-2', replace: true })
          }
        } catch (error) {
          // Any error, redirect to sign-in
          navigate({ to: '/sign-in-2', replace: true })
        } finally {
          setChecked(true)
        }
      }

      checkAuth()
    }, [navigate, auth.user, auth])

    if (!checked) return null
    if (!authed) return null
    // Final check: if user was cleared from store, deny access
    if (!auth.user) return null

    return <AuthenticatedLayout />
  },
})
