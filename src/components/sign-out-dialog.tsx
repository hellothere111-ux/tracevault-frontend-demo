import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { ConfirmDialog } from '@/components/confirm-dialog'
import authService from '@/services/auth.service'
import { useState } from 'react'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      // Call backend logout to clear HttpOnly cookies and server session
      await authService.logout()
    } catch (error) {
      console.error('Logout error (will continue):', error)
    } finally {
      // Clear store and localStorage regardless of API response
      auth.reset()
      // Redirect to login page
      navigate({
        to: '/sign-in-2',
        replace: true,
      })
      setIsLoading(false)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Sign out'
      desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
      confirmText='Sign out'
      destructive
      handleConfirm={handleSignOut}
      isLoading={isLoading}
      className='sm:max-w-sm'
    />
  )
}
