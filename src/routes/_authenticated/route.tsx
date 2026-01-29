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

    useEffect(() => {
      // For demo: very lenient authentication - just check localStorage exists
      const checkAuth = () => {
        try {
          const storedUser = authService.getUser()
          if (storedUser) {
            // User exists in localStorage, set in store if needed
            if (!auth.user) {
              auth.setUser({
                accountNo: storedUser.id.toString(),
                email: storedUser.email,
                role: [storedUser.role],
                exp: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
              })
            }
          } else {
            // For demo: if no user, create a default admin user
            const defaultUser = {
              id: 1,
              username: 'admin',
              email: 'admin@tracevault.com',
              first_name: 'Admin',
              last_name: 'User',
              role: 'admin',
              status: 'active'
            }
            
            // Store default user and set in auth store
            localStorage.setItem('user', JSON.stringify(defaultUser))
            auth.setUser({
              accountNo: defaultUser.id.toString(),
              email: defaultUser.email,
              role: [defaultUser.role],
              exp: Date.now() + 365 * 24 * 60 * 60 * 1000,
            })
          }
        } catch (error) {
          // For demo: even on error, create default user
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
        } finally {
          setChecked(true)
        }
      }

      checkAuth()
    }, [navigate, auth.user, auth])

    if (!checked) return null

    return <AuthenticatedLayout />
  },
})
