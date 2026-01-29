import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface CreateTenantDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; description?: string }) => Promise<void>
  isLoading?: boolean
}

export function CreateTenantDialog({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateTenantDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Tenant name is required')
      return
    }

    try {
      await onSubmit({ name, description })
      setName('')
      setDescription('')
      setError('')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tenant')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Tenant</DialogTitle>
          <DialogDescription>
            Add a new tenant to organize your projects
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium'>Tenant Name *</label>
            <Input
              placeholder='e.g., Acme Corporation'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Description</label>
            <Textarea
              placeholder='Optional description...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm'>
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Tenant'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}