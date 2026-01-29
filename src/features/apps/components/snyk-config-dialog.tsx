import { useState } from 'react'
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { storeSnykCredentials } from '@/services/credentials.service'

interface SnykConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect?: (config: SnykConfig) => void
}

export interface SnykConfig {
  apiToken: string
  orgId: string
}

export function SnykConfigDialog({ open, onOpenChange, onConnect }: SnykConfigDialogProps) {
  const [apiToken, setApiToken] = useState('')
  const [orgId, setOrgId] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validateInputs = () => {
    if (!apiToken.trim()) {
      setError('API Token is required')
      return false
    }
    if (!orgId.trim()) {
      setError('Organization ID is required')
      return false
    }
    return true
  }

  const handleConnect = async () => {
    setError('')
    if (!validateInputs()) return

    setLoading(true)
    try {
      // Simulate API validation
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In production, validate the token with Snyk API
      // GET https://api.snyk.io/v1/user/me
      // Headers: Authorization: token <api-token>

      // Store credentials securely
      storeSnykCredentials(apiToken, orgId)

      setSuccess(true)
      onConnect?.({
        apiToken,
        orgId,
      })

      // Reset after 2 seconds
      setTimeout(() => {
        setApiToken('')
        setOrgId('')
        setSuccess(false)
        onOpenChange(false)
      }, 2000)
    } catch (err) {
      setError('Failed to connect to Snyk. Please verify your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setApiToken('')
      setOrgId('')
      setError('')
      setSuccess(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Connect Snyk</DialogTitle>
          <DialogDescription>
            Configure your Snyk account for vulnerability scanning integration
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Success Alert */}
          {success && (
            <Alert className='border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'>
              <CheckCircle2 className='h-4 w-4 text-green-600 dark:text-green-400' />
              <AlertDescription className='text-green-800 dark:text-green-200'>
                Successfully connected to Snyk!
              </AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert className='border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950'>
              <AlertCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
              <AlertDescription className='text-red-800 dark:text-red-200'>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* API Token Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              API Token
              <span className='text-red-600 dark:text-red-400 ml-1'>*</span>
            </label>
            <div className='relative'>
              <Input
                type={showToken ? 'text' : 'password'}
                placeholder='Enter your Snyk API token'
                value={apiToken}
                onChange={(e) => {
                  setApiToken(e.target.value)
                  setError('')
                }}
                disabled={loading}
                className='pr-10'
              />
              <button
                type='button'
                onClick={() => setShowToken(!showToken)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
              >
                {showToken ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
            <p className='text-xs text-muted-foreground'>
              Find your token at{' '}
              <a
                href='https://app.snyk.io/account'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 dark:text-blue-400 hover:underline'
              >
                app.snyk.io/account
              </a>
            </p>
          </div>

          {/* Organization ID Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              Organization ID
              <span className='text-red-600 dark:text-red-400 ml-1'>*</span>
            </label>
            <Input
              placeholder='Enter your Snyk Organization ID'
              value={orgId}
              onChange={(e) => {
                setOrgId(e.target.value)
                setError('')
              }}
              disabled={loading}
            />
            <p className='text-xs text-muted-foreground'>
              Find your org ID at{' '}
              <a
                href='https://app.snyk.io/org'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 dark:text-blue-400 hover:underline'
              >
                app.snyk.io/org
              </a>
            </p>
          </div>

          {/* Security Notice */}
          <Card className='border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950'>
            <CardContent className='pt-4'>
              <p className='text-xs text-yellow-800 dark:text-yellow-200'>
                <span className='font-semibold'>🔒 Security Notice:</span> Your API token will be
                encrypted and stored securely. Never share your token with untrusted sources.
              </p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className='gap-2'>
          <Button variant='outline' onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={loading} className='min-w-24'>
            {loading ? 'Connecting...' : 'Connect'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
