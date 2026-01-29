import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { AssetTreeNode } from '../types/asset.types'
import { AssetType } from '../types/asset.types'
import { AlertCircle, Shield } from 'lucide-react'

interface AssetDetailPanelProps {
  node: AssetTreeNode | null
  onEdit: () => void
  onDelete: () => void
}

export function AssetDetailPanel({
  node,
  onEdit,
  onDelete,
}: AssetDetailPanelProps) {
  if (!node) {
    return (
      <Card>
        <CardContent className='pt-6 text-center text-muted-foreground'>
          Select an asset to view details
        </CardContent>
      </Card>
    )
  }

  const data = node.data
  const statusColor = data?.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'

  return (
    <div className='space-y-4'>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div>
              <CardTitle className='text-xl'>{node.name}</CardTitle>
              <CardDescription>
                {node.type.charAt(0).toUpperCase() + node.type.slice(1).replace('_', ' ')}
              </CardDescription>
            </div>
            <div className='flex gap-2'>
              <Button size='sm' variant='outline' onClick={onEdit}>
                Edit
              </Button>
              <Button size='sm' variant='destructive' onClick={onDelete}>
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='flex items-center gap-4'>
            <Badge className={statusColor}>
              {data?.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          {data?.description && (
            <p className='text-sm text-muted-foreground'>{data.description}</p>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className='grid grid-cols-2 gap-4'>
        {data?.vulnerabilities_count !== undefined && (
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <AlertCircle className='h-4 w-4 text-red-500' />
                Vulnerabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>{data.vulnerabilities_count}</p>
            </CardContent>
          </Card>
        )}

        {data?.risk_score !== undefined && (
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm flex items-center gap-2'>
                <Shield className='h-4 w-4 text-orange-500' />
                Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-2xl font-bold'>{data.risk_score.toFixed(1)}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Details Tabs */}
      <Tabs defaultValue='info' className='w-full'>
        <TabsList>
          <TabsTrigger value='info'>Information</TabsTrigger>
          <TabsTrigger value='timeline'>Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value='info'>
          <Card>
            <CardContent className='pt-6 space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-xs text-muted-foreground'>Created</p>
                  <p className='font-medium'>
                    {new Date(data?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-muted-foreground'>Last Updated</p>
                  <p className='font-medium'>
                    {new Date(data?.updated_at || '').toLocaleDateString()}
                  </p>
                </div>
              </div>

              {node.type === AssetType.ENVIRONMENT && (
                <>
                  <div>
                    <p className='text-xs text-muted-foreground'>Environment Type</p>
                    <Badge variant='outline'>
                      {(data as any).type?.toUpperCase()}
                    </Badge>
                  </div>
                  {(data as any).url && (
                    <div>
                      <p className='text-xs text-muted-foreground'>URL</p>
                      <a
                        href={(data as any).url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:underline text-sm break-all'
                      >
                        {(data as any).url}
                      </a>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='timeline'>
          <Card>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='flex gap-4'>
                  <div className='flex flex-col items-center'>
                    <div className='h-3 w-3 rounded-full bg-primary'></div>
                    <div className='w-0.5 h-12 bg-gray-200'></div>
                  </div>
                  <div>
                    <p className='text-sm font-semibold'>Created</p>
                    <p className='text-xs text-muted-foreground'>
                      {new Date(data?.created_at || '').toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex flex-col items-center'>
                    <div className='h-3 w-3 rounded-full bg-gray-300'></div>
                  </div>
                  <div>
                    <p className='text-sm font-semibold'>Last Updated</p>
                    <p className='text-xs text-muted-foreground'>
                      {new Date(data?.updated_at || '').toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}