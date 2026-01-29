import { Badge } from '@/components/ui/badge'
import { AlertCircle, AlertTriangle, Server, Database, Globe } from 'lucide-react'

interface VulnerableAsset {
  id: string
  name: string
  type: 'Server' | 'Web Application' | 'Database' | 'API' | 'Container'
  vulnCount: number
  criticalCount: number
}

const topVulnerableAssets: VulnerableAsset[] = [
  {
    id: '1',
    name: 'Production Auth Service',
    type: 'API',
    vulnCount: 3,
    criticalCount: 1,
  },
  {
    id: '2',
    name: 'User Dashboard',
    type: 'Web Application',
    vulnCount: 2,
    criticalCount: 0,
  },
  {
    id: '3',
    name: 'Main Database',
    type: 'Database',
    vulnCount: 2,
    criticalCount: 1,
  },
]

const getAssetIcon = (type: string) => {
  switch (type) {
    case 'Server':
      return <Server className='h-4 w-4' />
    case 'Web Application':
      return <Globe className='h-4 w-4' />
    case 'Database':
      return <Database className='h-4 w-4' />
    case 'API':
      return <AlertCircle className='h-4 w-4' />
    default:
      return <AlertCircle className='h-4 w-4' />
  }
}

export function RecentSales() {
  return (
    <div className='space-y-4'>
      {topVulnerableAssets.map((asset) => (
        <div
          key={asset.id}
          className='flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700'
        >
          <div className='flex items-center gap-3 flex-1 min-w-0'>
            <div className='flex-shrink-0'>{getAssetIcon(asset.type)}</div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium truncate'>{asset.name}</p>
              <p className='text-xs text-muted-foreground'>{asset.type}</p>
            </div>
          </div>

          <div className='flex items-center gap-2 flex-shrink-0'>
            {asset.criticalCount > 0 && (
              <Badge variant='destructive' className='text-xs'>
                {asset.criticalCount} Critical
              </Badge>
            )}
            <Badge variant='outline' className='text-xs'>
              {asset.vulnCount} Total
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
