import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Link, Tag } from 'lucide-react'
import type { AssetTreeNode } from '../../types/asset.types'
import { AssetType } from '../../types/asset.types'

interface DetailsTabProps {
  node: AssetTreeNode | null
}

export function DetailsTab({ node }: DetailsTabProps) {
  if (!node) return null

  const data = node.data

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Created Date
              </p>
              <p className="font-medium dark:text-foreground">
                {new Date(data?.created_at || '').toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last Updated
              </p>
              <p className="font-medium dark:text-foreground">
                {new Date(data?.updated_at || '').toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Status</p>
              <Badge className={data?.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-muted dark:text-gray-200'}>
                {data?.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Type</p>
              <Badge variant="outline">
                {node.type.charAt(0).toUpperCase() + node.type.slice(1).replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {data?.description && (
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Description</p>
              <p className="mt-1 dark:text-foreground">{data.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Environment-specific Details */}
      {node.type === AssetType.ENVIRONMENT && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Environment Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Environment Type</p>
                <Badge variant="outline">
                  {(data as any).type?.toUpperCase()}
                </Badge>
              </div>
              {(data as any).url && (
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    URL
                  </p>
                  <a
                    href={(data as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                  >
                    {(data as any).url}
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags and Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Tags & Metadata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">production</Badge>
            <Badge variant="secondary">web-application</Badge>
            <Badge variant="secondary">customer-facing</Badge>
            <Badge variant="secondary">pci-compliant</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Owner</p>
              <p className="font-medium dark:text-foreground">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Team</p>
              <p className="font-medium dark:text-foreground">Engineering Team</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
