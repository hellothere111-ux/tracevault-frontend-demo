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
      // If user is not in store, deny access immediately
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
          setAuthed(true)
        } catch (e) {
          if (!mounted) return
          navigate({ to: '/sign-in-2', replace: true })
        } finally {
          if (mounted) setChecked(true)
        }
      }

      verify()

      return () => {
        mounted = false
      }
    }, [navigate, auth.user])

    if (!checked) return null
    if (!authed) return null
    // Extra check: if user was cleared from store (logout), deny access
    if (!auth.user) return null

    return <AuthenticatedLayout />
  },
})
