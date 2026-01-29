import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, AlertCircle, Calendar, User, Radar, FileText } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import type { AssetTreeNode } from '../types/asset.types'
import { AssetType } from '../types/asset.types'

interface EnhancedAssetHeaderProps {
  node: AssetTreeNode | null
}

export function EnhancedAssetHeader({ node }: EnhancedAssetHeaderProps) {
  const navigate = useNavigate()
  if (!node) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Select an asset to view details
        </CardContent>
      </Card>
    )
  }

  const data = node.data
  const statusColor = data?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  const typeColor = {
    [AssetType.TENANT]: 'bg-purple-100 text-purple-800',
    [AssetType.PROJECT]: 'bg-blue-100 text-blue-800',
    [AssetType.SUB_PROJECT]: 'bg-indigo-100 text-indigo-800',
    [AssetType.ENVIRONMENT]: 'bg-green-100 text-green-800'
  }[node.type] || 'bg-gray-100 text-gray-800'

  const getRiskLevelColor = (riskScore: number) => {
    if (riskScore >= 8) return 'text-red-600 bg-red-50'
    if (riskScore >= 6) return 'text-orange-600 bg-orange-50'
    if (riskScore >= 4) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  const riskLevelColor = getRiskLevelColor(data?.risk_score || 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title and Badges */}
            <div className="flex items-center gap-3 mb-3">
              <CardTitle className="text-2xl">{node.name}</CardTitle>
              <Badge className={statusColor}>
                {data?.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
              <Badge className={typeColor}>
                {node.type.charAt(0).toUpperCase() + node.type.slice(1).replace('_', ' ')}
              </Badge>
            </div>

            {/* Description */}
            {data?.description && (
              <p className="text-muted-foreground mb-4">{data.description}</p>
            )}

            {/* Key Metrics */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* Risk Score */}
              <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${riskLevelColor}`}>
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Risk Score:</span>
                <span className="font-bold">{(data?.risk_score || 0).toFixed(1)}</span>
              </div>

              {/* Created Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(data?.created_at || '').toLocaleDateString()}</span>
              </div>

              {/* Last Updated */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Updated: {new Date(data?.updated_at || '').toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 ml-4">
            <Button size="sm" variant="outline" onClick={() => navigate({ to: '/appsec' })}>
              <Radar className="h-4 w-4 mr-1" />
              Scan Now
            </Button>
            <Button size="sm" variant="outline" onClick={() => console.log('View report')}>
              <FileText className="h-4 w-4 mr-1" />
              View Report
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
