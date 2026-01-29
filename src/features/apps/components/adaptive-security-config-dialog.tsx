import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Brain } from 'lucide-react'

interface AdaptiveSecurityConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdaptiveSecurityConfigDialog({ open, onOpenChange }: AdaptiveSecurityConfigDialogProps) {
  const [apiKey, setApiKey] = useState('')
  const [accountId, setAccountId] = useState('')

  const handleSave = () => {
    // Handle saving configuration
    console.log('Saving Adaptive Security configuration:', {
      apiKey,
      accountId
    })
    onOpenChange(false)
  }

  const handleTestConnection = () => {
    // Handle testing connection
    console.log('Testing Adaptive Security connection...')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Adaptive Security Configuration
          </DialogTitle>
          <DialogDescription>
            Connect your Adaptive Security account for training and phishing simulations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Connection Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Connection Settings</h3>
            </div>
            
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your Adaptive Security API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-id">Account ID</Label>
                <Input
                  id="account-id"
                  placeholder="Enter your Adaptive Security Account ID"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">Organization Domain</Label>
                <Input
                  id="domain"
                  placeholder="your-company.adaptivesecurity.com"
                  value="your-company.adaptivesecurity.com"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleTestConnection}>
            Test Connection
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
