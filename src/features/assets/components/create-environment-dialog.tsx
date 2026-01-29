import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CreateEnvironmentDialogProps {
  isOpen: boolean
  parentName?: string
  onClose: () => void
  onSubmit: (data: {
    name: string
    type: string
    url?: string
    description?: string
  }) => Promise<void>
  isLoading: boolean
}

export function CreateEnvironmentDialog({
  isOpen,
  parentName,
  onClose,
  onSubmit,
  isLoading,
}: CreateEnvironmentDialogProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('dev')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Environment name is required')
      return
    }

    if (url && !isValidUrl(url)) {
      setError('Invalid URL format')
      return
    }

    try {
      await onSubmit({
        name: name.trim(),
        type,
        url: url.trim() || undefined,
        description: description.trim() || undefined,
      })
      setName('')
      setType('dev')
      setUrl('')
      setDescription('')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create environment')
    }
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Environment</DialogTitle>
          <DialogDescription>
            {parentName && `Under: ${parentName}`}
            {!parentName && 'Add a new environment'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='env-name'>Environment Name *</Label>
            <Input
              id='env-name'
              placeholder='e.g., Production'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='env-type'>Type *</Label>
            <Select value={type} onValueChange={setType} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='dev'>Development</SelectItem>
                <SelectItem value='staging'>Staging</SelectItem>
                <SelectItem value='qa'>QA</SelectItem>
                <SelectItem value='production'>Production</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='env-url'>URL</Label>
            <Input
              id='env-url'
              type='url'
              placeholder='https://example.com'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='env-description'>Description</Label>
            <Textarea
              id='env-description'
              placeholder='Describe this environment...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          {error && <p className='text-sm text-red-600'>{error}</p>}

          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Environment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}