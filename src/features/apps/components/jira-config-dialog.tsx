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
import { storeJiraCredentials } from '@/services/credentials.service'

interface JiraConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect?: (config: JiraConfig) => void
}

export interface JiraConfig {
  domain: string
  email: string
  apiToken: string
}

export function JiraConfigDialog({ open, onOpenChange, onConnect }: JiraConfigDialogProps) {
  const [domain, setDomain] = useState('')
  const [email, setEmail] = useState('')
  const [apiToken, setApiToken] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validateInputs = () => {
    if (!domain.trim()) {
      setError('Domain is required (e.g., your-domain.atlassian.net)')
      return false
    }
    if (!domain.includes('atlassian.net')) {
      setError('Domain must be a valid Jira Cloud instance')
      return false
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Valid email is required')
      return false
    }
    if (!apiToken.trim()) {
      setError('API Token is required')
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

      // In production, validate with Jira API
      // GET https://{domain}/rest/api/3/myself
      // Headers: 
      //   Authorization: Basic base64(email:apiToken)
      //   Content-Type: application/json

      // Store credentials securely
      storeJiraCredentials(domain, email, apiToken)

      setSuccess(true)
      onConnect?.({
        domain,
        email,
        apiToken,
      })

      // Reset after 2 seconds
      setTimeout(() => {
        setDomain('')
        setEmail('')
        setApiToken('')
        setSuccess(false)
        onOpenChange(false)
      }, 2000)
    } catch (err) {
      setError('Failed to connect to Jira. Please verify your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setDomain('')
      setEmail('')
      setApiToken('')
      setError('')
      setSuccess(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Connect Jira</DialogTitle>
          <DialogDescription>
            Configure your Jira Cloud account for task and sprint management
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Success Alert */}
          {success && (
            <Alert className='border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'>
              <CheckCircle2 className='h-4 w-4 text-green-600 dark:text-green-400' />
              <AlertDescription className='text-green-800 dark:text-green-200'>
                Successfully connected to Jira!
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

          {/* Domain Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              Domain
              <span className='text-red-600 dark:text-red-400 ml-1'>*</span>
            </label>
            <Input
              placeholder='your-domain.atlassian.net'
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value)
                setError('')
              }}
              disabled={loading}
            />
            <p className='text-xs text-muted-foreground'>
              Your Jira Cloud instance domain (e.g., acme.atlassian.net)
            </p>
          </div>

          {/* Email Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              Email
              <span className='text-red-600 dark:text-red-400 ml-1'>*</span>
            </label>
            <Input
              type='email'
              placeholder='your-email@company.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              disabled={loading}
            />
            <p className='text-xs text-muted-foreground'>
              Email associated with your Jira account
            </p>
          </div>

          {/* API Token Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              API Token
              <span className='text-red-600 dark:text-red-400 ml-1'>*</span>
            </label>
            <div className='relative'>
              <Input
                type={showToken ? 'text' : 'password'}
                placeholder='Enter your Jira API token'
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
              Create at{' '}
              <a
                href='https://id.atlassian.com/manage-profile/security/api-tokens'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 dark:text-blue-400 hover:underline'
              >
                id.atlassian.com/manage-profile/security/api-tokens
              </a>
            </p>
          </div>

          {/* Security Notice */}
          <Card className='border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950'>
            <CardContent className='pt-4'>
              <p className='text-xs text-yellow-800 dark:text-yellow-200'>
                <span className='font-semibold'>🔒 Security Notice:</span> Your credentials will be
                encrypted and stored securely. API tokens are never logged or shared. Revoke access
                at any time from your Jira settings.
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
